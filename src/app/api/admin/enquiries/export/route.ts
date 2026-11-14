import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getEnquiries, recordAuditLog } from "@/lib/cms";

/**
 * Neutralizes spreadsheet formula injection (CSV/Excel Injection)
 * by prefixing cells starting with =, +, -, @, tab, or carriage return with a single quote.
 */
function sanitizeFormulaCell(value: string): string {
  const clean = (value ?? "").replace(/\r\n/g, "\n").trim();
  if (/^[=+\-@\t\r]/.test(clean)) {
    return `'${clean}`;
  }
  return clean;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userRole =
    (session.user as { role?: string }).role || "SUPER_ADMIN";
  if (userRole !== "SUPER_ADMIN" && userRole !== "ADMIN") {
    return NextResponse.json(
      { error: "Forbidden: Administrator role required for data export." },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const format = (searchParams.get("format") || "csv").toLowerCase();
  const statusFilter = searchParams.get("status") || "ALL";

  const allEnquiries = await getEnquiries();
  const enquiries =
    statusFilter && statusFilter !== "ALL"
      ? allEnquiries.filter((e) => e.status === statusFilter)
      : allEnquiries;

  await recordAuditLog({
    actorEmail: session.user.email || "admin@advaita1.com",
    actorRole: userRole,
    action: "ENQUIRY_EXPORT",
    entityType: "Enquiry",
    entityId: "bulk",
    summary: `Exported ${enquiries.length} enquiries in ${format.toUpperCase()} format.`,
  });

  const headers = [
    "ID",
    "Status",
    "Submitted Date",
    "Full Name",
    "Email",
    "Phone",
    "Organisation",
    "Interested Solution",
    "Subject",
    "Message",
    "Internal Notes",
  ];

  const dateStamp = new Date().toISOString().slice(0, 10);

  if (format === "excel" || format === "xls" || format === "xlsx") {
    // Generate Excel-native SpreadsheetML XML workbook with formula-injection protection
    const xmlRows = enquiries
      .map((e) => {
        const cells = [
          e.id,
          e.status === "NEW"
            ? "New"
            : e.status === "ARCHIVED"
              ? "Closed"
              : "Contacted",
          e.createdAt,
          e.fullName,
          e.email,
          e.phone,
          e.institutionName,
          e.solutionInterest,
          e.subject,
          e.message,
          e.adminNotes || "",
        ].map(
          (val) =>
            `<Cell><Data ss:Type="String">${escapeXml(
              sanitizeFormulaCell(val)
            )}</Data></Cell>`
        );
        return `<Row>${cells.join("")}</Row>`;
      })
      .join("\n");

    const headerCells = headers
      .map(
        (h) =>
          `<Cell><Data ss:Type="String">${escapeXml(h)}</Data></Cell>`
      )
      .join("");

    const workbookXml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="iGUIDE Enquiries">
  <Table>
   <Row>${headerCells}</Row>
   ${xmlRows}
  </Table>
 </Worksheet>
</Workbook>`;

    return new NextResponse(workbookXml, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.ms-excel; charset=utf-8",
        "Content-Disposition": `attachment; filename="iguide-enquiries-${dateStamp}.xls"`,
      },
    });
  }

  // Default: Formula-injection-safe UTF-8 CSV
  const escapeCsv = (val: string) => {
    const safe = sanitizeFormulaCell(val).replace(/"/g, '""');
    return `"${safe}"`;
  };

  const rows = enquiries.map((e) =>
    [
      e.id,
      e.status === "NEW"
        ? "New"
        : e.status === "ARCHIVED"
          ? "Closed"
          : "Contacted",
      e.createdAt,
      e.fullName,
      e.email,
      e.phone,
      e.institutionName,
      e.solutionInterest,
      e.subject,
      e.message,
      e.adminNotes || "",
    ]
      .map(escapeCsv)
      .join(",")
  );

  const csvContent = `\uFEFF${[headers.join(","), ...rows].join("\n")}`;

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="iguide-enquiries-${dateStamp}.csv"`,
    },
  });
}
