const dataTransfer = new DataTransfer();

describe("Test Mailfence.com", () => {
  beforeEach(() => {
    cy.visit("https://mailfence.com/sw?type=L&state=0&lf=mailfence");
  });

  //Test 1 - Login to mailfence.com
  it("Login to mailfence.com", () => {
    cy.get("#UserID").type("cypqa@mailfence.com"); // Input Login
    cy.get("#Password").type("cypqa12345"); // Input Password
    cy.get(".btn").click();

    //Test 2 - Attach *.txt file
    cy.get("#nav-docs").should("exist").click(); // Open "Documents" tab
    cy.writeFile(
      "C:\\work\\cypress_course\\test_file.txt",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
        when an unknown printer took a galley of type and scrambled it to make a type \
        specimen book. It has survived not only five centuries, but also the leap into \
        electronic typesetting, remaining essentially unchanged. It was popularised in \
        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, \
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );
    cy.readFile("C:\\work\\cypress_course\\test_file.txt").should("not.be.null");
    cy.get("input[type=file]").selectFile("test_file.txt", {
      action: "drag-drop",
      force: true,
    });
    cy.get(".GCSDBRWBK5B").click(); // Click on [Close] button on drag&drop window

    //Test 3 - Send email with attached file to yourself
    cy.get("#nav-mail").click(); // Open "Messages" tab
    cy.get("#mailNewBtn").click(); // Click on [New] button
    cy.get("#mailTo").type("cypqa@mailfence.com;");
    cy.get("#mailSubject").type("This is test email for Cypress_course"); // need to add unique title
    cy.frameLoaded("").get(".editable ").click().type(
      "Привет!\
    Это тестовое письмо на русском языке.\
    С уважением,\
    Артем"
    );
    cy.get(".GCSDBRWBISB.GCSDBRWBJSB").contains("Attachment").click();
    cy.get(".GCSDBRWBNQ.menu div ul li:nth-child(2) a").click();
    //Attach *.txt file
    cy.get(".GCSDBRWBAU tbody tr").contains("test_file.txt").click();
    cy.get("#dialBtn_OK").click();
    cy.get("#mailSend").click();

    //Test 4 - Check that email received
    cy.get("#nav-mail").click(); // Open "Messages" tab
    cy.get("#treeInbox").click(); // Open "Inbox"
    cy.get(".GCSDBRWBBU.trow.listUnread").contains("").should("exist"); // need to check email by title

    //Test 5 - Open the received email
    cy.get(".GCSDBRWBBU.trow.listUnread").contains("This is test email for Cypress_course").click();

    //Test 6 - Save the attached TXT file to "Documents"
    cy.get(".GCSDBRWBN a b").click({ force: true });
    cy.get(".GCSDBRWBOQ").contains("Save in Documents").click();
    cy.get(".treeItemLabel").contains("My documents").click();
    cy.get("#dialBtn_OK:visible").should("not.contain.class", "GCSDBRWBMB").click();

    // //Test 7 - Open "Documents" area
    cy.get("#nav-docs").click(); // Open "Documents" tab

    //Test 8 - Move file from "Мои документы" to "Trash"

    Cypress.Commands.add("dragAndDrop", (subject, target) => {
      Cypress.log({
        name: "DRAGNDROP",
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
          return {
            subject: subject,
            target: target,
          };
        },
      });
      subject.trigger("mousedown", { button: 0 }).trigger("mousemove", { clientX: 100, clientY: 100 });
      target.trigger("mousemove", { clientX: 100, clientY: 100 }).trigger("mouseup", { force: true });
    });

    cy.dragAndDrop(".GCSDBRWBBU.GCSDBRWBDU.trow.selectedRow.widgetActive", "#doc_tree_trash");

    // Doesn't work #1
    // cy.get(".GCSDBRWBAU").contains("test_file.txt").click();
    // cy.get(".GCSDBRWBBU.GCSDBRWBDU.trow.selectedRow.widgetActive").trigger("dragstart", { dataTransfer, force: true });
    // // cy.get(".GCSDBRWBBU.GCSDBRWBDU.trow.selectedRow.widgetActive").trigger("dragover", { dataTransfer, force: true });
    // cy.get(".GCSDBRWBBU.GCSDBRWBDU.trow.selectedRow.widgetActive").trigger("mousemove", { force: true });
    // cy.get("#doc_tree_trash").trigger("drop", { dataTransfer, force: true });

    ////Doesn't work #2
    // cy.get(".GCSDBRWBAU").contains("test_file.txt").click();
    // cy.get(".GCSDBRWBAU").contains("test_file.txt").trigger("dragstart", { dataTransfer, force: true });
    // // cy.get(".GCSDBRWBBU.GCSDBRWBDU.trow.selectedRow.widgetActive").trigger("dragover", { dataTransfer, force: true });
    // cy.get(".GCSDBRWBAU").contains("test_file.txt").trigger("dragover", { force: true });
    // cy.get("#doc_tree_trash").trigger("drop", { dataTransfer, force: true });
    // ///Doesn't work #3
    // cy.get(".GCSDBRWBAU").contains("test_file.txt").click();
    // cy.get(".GCSDBRWBAU").contains("test_file.txt").trigger("mousedown");
    // // cy.get(".GCSDBRWBBU.GCSDBRWBDU.trow.selectedRow.widgetActive").trigger("dragover", { dataTransfer, force: true });
    // cy.get(".GCSDBRWBAU").contains("test_file.txt").trigger("mousemove");
    // cy.get("#doc_tree_trash").trigger("mouseup");

    // // Doesn't work #4
    // // cy.get(".GCSDBRWBAU").contains("test_file.txt").click();
    // // cy.get(".GCSDBRWBBU.GCSDBRWBDU.trow.selectedRow.widgetActive").trigger("mousedown", { force: true });
    // // cy.get(".GCSDBRWBBU.GCSDBRWBDU.trow.selectedRow.widgetActive").trigger("mousemove", { force: true });
    // // cy.get("#doc_tree_trash").trigger("mouseup");
    // cy.wait(3000);

    // cy.clearAllCookies({ log: true });
    // cy.clearAllLocalStorage({ log: true });
    // cy.clearAllSessionStorage({ log: true });
  });
});
