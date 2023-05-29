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
    cy.wait(3000); //Techdebt: change 'timeout' to some trigger with fully loaded page

    // // //Test 2 - Attach *.txt file
    // // cy.get("#nav-docs").click(); // Open "Documents" tab
    // // cy.writeFile(
    // //   "C:\\work\\cypress_course\\test_file.txt",
    // //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
    // //     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
    // //     when an unknown printer took a galley of type and scrambled it to make a type \
    // //     specimen book. It has survived not only five centuries, but also the leap into \
    // //     electronic typesetting, remaining essentially unchanged. It was popularised in \
    // //     the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, \
    // //     and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    // // );
    // // cy.readFile("C:\\work\\cypress_course\\test_file.txt").should("not.be.null");
    // // cy.get("input[type=file]").selectFile("test_file.txt", {
    // //   action: "drag-drop",
    // //   force: true,
    // // });
    // // cy.wait(1000);
    // // cy.get(".GCSDBRWBK5B").click(); // Click on [Close] button on drag&drop window

    //Test 3 - Send email with attached file to yourself
    cy.get("#nav-mail").click(); // Open "Messages" tab
    cy.get("#mailNewBtn").click(); // Click on [New] button
    cy.get("#mailTo").type("cypqa@mailfence.com;");
    cy.get("#mailSubject").type("This is test email for Cypress_course");
    cy.get(".editable ").click().type(
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

    cy.wait(1000);
    cy.get("#mailSend").click();
    cy.wait(10000);

    //Test 4 - Check that email received
    cy.get("#nav-mail").click(); // Open "Messages" tab
    cy.get("#treeInbox").click(); // Open "Inbox"
    cy.wait(10000);
    cy.get(".GCSDBRWBBU.trow.listUnread").contains("This is test email for Cypress_course").should("exist");

    //Test 5 - Open the received email
    cy.get(".GCSDBRWBBU.trow.listUnread").contains("This is test email for Cypress_course").click();

    //Test 6 - Save the attached TXT file to "Documents"
    cy.get(".GCSDBRWBN a b").click({ force: true });
    cy.get(".GCSDBRWBOQ").contains("Save in Documents").click();
    cy.wait(3000);
    cy.get(".treeItemLabel").contains("My documents").click();
    cy.get("#dialBtn_OK:visible").should("not.contain.class", "GCSDBRWBMB").click();
    cy.wait(3000);

    //Test 7 - Open "Documents" area
    cy.get("#nav-docs").click(); // Open "Documents" tab

    //Test 8 - Move file from "Мои документы" to "Trash"
    cy.wait(5000);
    cy.pause();
    cy.get(".GCSDBRWBFT").contains("test_file.txt").click().trigger("dragstart", { dataTransfer });
    cy.get(".GCSDBRWBFT").contains("test_file.txt").trigger("dragover");
    cy.get("#doc_tree_trash").trigger("drop", { dataTransfer });
    cy.wait(3000);
  });
});

// it('can add new todo items', () => {
//   const newItem = 'Feed the cat'
//   cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)
//   cy.get('.todo-list li')
//     .should('have.length', 3)
//     .last()
//     .should('have.text', newItem)
// })
// });

/*

1) tag <input /> -> "input" , <div> <p> <span> 

2) class 
  <input class="my-input" />
  <div class="my-input superClass">

  "div.my-input .superClass"

3) id

  <input id="my-input" />
  <div class="my-input superClass">

  "#my-input", "div#my-input.superClass"
*/

// a, input, button
// div, tr, td, span with attribute -> onclick, clic
