let totalExpenses =document.querySelector("#totalExpenses");
let form =document.querySelector("#form");
let inputName=document.querySelector("#name");
let inputAmount=document.querySelector("#amount");
let inputCategory=document.querySelector("#category");
let expenseList=document.querySelector("#expense-list");


const expenses=[];
const savedExpenses = localStorage.getItem("expenses");

if (savedExpenses) {
    expenses.push(...JSON.parse(savedExpenses));
}
function renderExpenses() {
     if (expenses.length === 0) {
        expenseList.innerHTML = `<p>No expenses yet</p>`;
    } else {

        let html = "";

        expenses.forEach(function(expense, index) {
           html += `
    <div class="expense-item">
        <div>
            <strong>${expense.name}</strong>
            <span>₹${expense.amount}</span>
            <span>${expense.category}</span>
        </div>
        <button data-index="${index}">Delete</button>
    </div>
`;
        });

        expenseList.innerHTML = html;
    }


    const total = expenses.reduce(function(accumulator, expense) {
        return accumulator + expense.amount;
    }, 0);

    totalExpenses.textContent = `Total Expenses : ₹${total}`;
}


form.addEventListener("submit",function(event){
    event.preventDefault();
    const expense = {
    name: inputName.value,
    amount: Number(inputAmount.value),
    category: inputCategory.value
};
expenses.push(expense);
localStorage.setItem("expenses",JSON.stringify(expenses));
renderExpenses();
form.reset();
})
expenseList.addEventListener("click",function(event){
   
   const index= Number(event.target.dataset.index);
    expenses.splice(index,1);
 localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();
     
})
renderExpenses();