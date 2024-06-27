const PdfPrinter = require("pdfmake");
const fs = require("fs");
const path = require("path");
const { fillColor } = require("pdfkit");

// Define the fonts to be used in the PDF
const fonts = {
  Roboto: {
    normal: path.join(__dirname, "fonts", "Roboto-Regular.ttf"),
    bold: path.join(__dirname, "fonts", "Roboto-Bold.ttf"),
    italics: path.join(__dirname, "fonts", "Roboto-Italic.ttf"),
    bolditalics: path.join(__dirname, "fonts", "Roboto-BoldItalic.ttf"),
  },
};

const printer = new PdfPrinter(fonts);

const generateTaxReport = async (taxpayer, sumOfCat, totalTax, Amounts) => {
  const docDefinition = {
    content: [
      { text: "Income Tax Calculation Statement", style: "header" },
      { text: `Name: ${taxpayer.name}`, style: "subheader" },
      { text: `TIN: ${taxpayer.tin}`, style: "subheader" },
      { text: `Email: ${taxpayer.email}`, style: "subheader" },

      { text: `Created At: ${taxpayer.createdAt}`, style: "subheader" },
      { text: "\n" },
      { text: "Total Assessable Income", style: "sectionHeader" },
      {
        ul: [
          {
            text: `Employment Income: ${
              Amounts[0].employmentIncome ||
              0 + Amounts[0].employmentIncome2 ||
              0
            }`,
          },
          {
            text: `Business Income: ${
              Amounts[1].businessIncome || 0 + Amounts[1].businessIncome2 || 0
            }`,
          },
          {
            text: `Investment Income: ${
              Amounts[2].investmentIncome ||
              0 + Amounts[2].investmentIncome2 ||
              0
            }`,
          },
          {
            text: `Rent Income: ${
              Amounts[3].reliefForRentIncome ||
              0 + Amounts[3].reliefForRentIncome2 ||
              0
            }`,
          },
          {
            text: `Other Income: ${
              Amounts[4].otherIncome || 0 + Amounts[4].otherIncome || 0
            }`,
          },
        ],
      },
      { text: "Qualifying Payments & Reliefs", style: "sectionHeader" },
      {
        ul: [
          {
            text: `Expenditure and personal Relief: ${
              sumOfCat.Reliefs || 0 + sumOfCat.Reliefs || 0
            }`,
          },
          { text: `Qualifying Payments: ${sumOfCat.Choosed_QP || 0}` },
          {
            text: `Rent Income Relief: ${
              (Amounts[3].reliefForRentIncome ||
                0 + Amounts[3].reliefForRentIncome2 ||
                0) * 0.25
            }`,
          },
        ],
      },
      { text: "Tax Credit", style: "sectionHeader" },
      {
        ul: [
          {
            text: `Total Tax Credit: ${
              sumOfCat.TaxCredit || 0 + sumOfCat.TaxCredit2 || 0
            }`,
          },
        ],
      },
      { text: "Other", style: "sectionHeader" },
      {
        ul: [
          { text: `Tax on Terminal Benefits: ${totalTax.TerminalTax || 0}` },
          { text: `Tax on Capital Value & Gain: ${totalTax.CapitalTax || 0}` },
          {
            text: `Tax on WHT which is not deducted: ${
              totalTax.WHTNotDeductTax || 0
            }`,
          },
        ],
      },
      { text: "\n" },
      { text: "Calculation Details", style: "sectionHeader" },
      {
        columns: [
          {
            width: "*",
            stack: [
              { text: "First 9 Months", style: "subheader" },
              {
                table: {
                  widths: ["*", "*", "*", "*", "*"],
                  body: [
                    [
                      "Total Assessable Income",
                      "Qualifying Payments & Reliefs",
                      "Tax Credit",
                      "Tax on Income",
                      "Tax on other Benifits",
                    ],
                    [
                      sumOfCat.TotAssessableIncome || 0,
                      sumOfCat.Reliefs ||
                        0 + (sumOfCat.Choosed_QP || 0 * 9) / 12,
                      sumOfCat.TaxCredit || 0,
                      totalTax.incomeTax || 0,
                      (((totalTax.TerminalTax || 0) +
                        (totalTax.CapitalTax || 0) +
                        (totalTax.WHTNotDeductTax || 0)) *
                        9) /
                        12,
                    ],
                  ],
                },
                layout: "lightHorizontalLines",
              },
            ],
          },
        ],
      },
      {
        columns: [
          {
            width: "*",
            stack: [
              { text: "Last 3 Months", style: "subheader" },
              {
                table: {
                  widths: ["*", "*", "*", "*", "*"],
                  body: [
                    [
                      "Total Assessable Income",
                      "Qualifying Payments & Reliefs",
                      "Tax Credit",
                      "Tax on Income",
                      "Tax on other Benifits",
                    ],
                    [
                      sumOfCat.TotAssessableIncome2 || 0,
                      sumOfCat.Reliefs2 ||
                        0 + (sumOfCat.Choosed_QP || 0 * 3) / 12,
                      sumOfCat.TaxCredit2 || 0,
                      totalTax.incomeTax2 || 0,
                      (((totalTax.TerminalTax || 0) +
                        (totalTax.CapitalTax || 0) +
                        (totalTax.WHTNotDeductTax || 0)) *
                        3) /
                        12,
                    ],
                  ],
                },
                layout: "lightHorizontalLines",
              },
            ],
          },
        ],
      },
      { text: "\n\n" },
      {
        text: `Total tax to pay: ${
          (totalTax.incomeTax || 0) +
          (totalTax.incomeTax2 || 0) +
          (totalTax.TerminalTax || 0) +
          (totalTax.CapitalTax || 0) +
          (totalTax.WHTNotDeductTax || 0) -
          (sumOfCat.TaxCredit || 0) -
          (sumOfCat.TaxCredit2 || 0)
        } LKR`,
        style: "customText",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        color: "#002244",
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        color: "#002D62",
        margin: [0, 5, 0, 5],
      },
      sectionHeader: {
        fontSize: 16,
        bold: true,
        color: "#002244",
        margin: [0, 5, 0, 5],
      },
      customText: {
        fontSize: 18,
        bold: true,
        color: "#0000FF",
        margin: [0, 10, 0, 5],
      },
    },
  };

  try {
    // Create PDF document
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    // Construct the path to the desired directory
    const directoryPath = path.join(
      __dirname,
      "../public/files",
      taxpayer.id.toString()
    );

    // Ensure the directory exists, create it if it doesn't
    const fs = require("fs");
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Save PDF to a file
    const filePath = path.join(directoryPath, `tax_report_${taxpayer.id}.pdf`);
    const writeStream = fs.createWriteStream(filePath);
    pdfDoc.pipe(writeStream);

    pdfDoc.end();

    // Return file path after stream finishes
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    return filePath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("PDF generation failed");
  }
};

module.exports = { generateTaxReport };
