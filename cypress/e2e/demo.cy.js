import formSelectors from "../selectors/formSelectors.json"

describe('Basic Calculator', () => {
    let val1 = 10;
    let val2 = 20;
    let add = val1 + val2
    let sub = val1 - val2
    let div = val1/ val2
    let mul = val1*val2
    let concatenate = '' + val1+ val2

    
    function getAnswer(opr){
        if(opr == 'Add'){ return add}
        if(opr == 'Subtract'){ return sub}
        if(opr == 'Divide'){ return div}
        if(opr == "Multiply"){ return mul}
        if(opr == 'Concatenate') {return concatenate}
    }
    

    beforeEach(() => {
        cy.visit('https://testsheepnz.github.io/BasicCalculator');

    });
    
    it('if the user is able to type in the calculator form fields', () => {
        cy.get(formSelectors.number1).type(val1).should('have.value', val1)
        cy.get(formSelectors.number2).type(val2).should('have.value', val2)
    });

    it('if the user is getting correct answer ', () => {
        cy.get(formSelectors.number1).type(val1)
        cy.get(formSelectors.number2).type(val2)
        // cy.get(formSelectors.operationDropdown).invoke('show')
        cy.get(formSelectors.operations).each((opration) =>{
            let opr = opration.text()
            let answer = getAnswer(opr)
            cy.get(formSelectors.operationDropdown).select(opr)
            cy.get(formSelectors.calculateButton).click()
            cy.get(formSelectors.answerField).should('have.value', answer)
        })
    });

    it('if clear button clears the answer field and integer check box', () => {
        cy.reload()
        cy.get(formSelectors.number1).type(val1)
        cy.get(formSelectors.number2).type(val2)
        cy.get(formSelectors.operationDropdown).select('Add')
        cy.get(formSelectors.integerCheckbox).check()
        cy.get(formSelectors.calculateButton).click()
        cy.get(formSelectors.clearButton).click()
        cy.get(formSelectors.integerCheckbox).should('not.be.checked')
        cy.get(formSelectors.answerField).should('not.have.value')

    });

    it('error message', () => {
        val1 = 'abcd'
        val2 = 'cder'
        let errorMessage = 'Number 1 is not a number'
        cy.get(formSelectors.number1).type(val1)
        cy.get(formSelectors.number2).type(val2)
        cy.get(formSelectors.operationDropdown).select('Add')
        cy.get(formSelectors.calculateButton).click()
        cy.get(formSelectors.errorMsg).contains(errorMessage).should('be.visible')
    });
});