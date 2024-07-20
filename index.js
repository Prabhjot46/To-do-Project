const checkBox = document.querySelectorAll(".radio");
const inputFields = document.querySelectorAll(".radio-text");
const errorLabel = document.querySelector(".para1");
const progress = document.querySelector(".progress");
const progressValue = document.querySelector(".prog");

const allGoals = JSON.parse(localStorage.getItem('allGoals') ) || {};

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
]

let completedGoalsCount = Object.values(allGoals).filter((goals) => goals.completed).length;

progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;

progressValue.firstElementChild.innertext = `${completedGoalsCount} /3 Completed`;

progress.firstElementChild.innerText = allQuotes[completedGoalsCount];

checkBox.forEach((checkBoxl) => {
    checkBoxl.addEventListener("click", (e) =>{
       
        let inputFieldsFilled = [...inputFields].every((input) =>{
            return input.value;
        })
        if(inputFieldsFilled){
            checkBoxl.parentElement.classList.toggle("completed");
            // progressValue.style.width = '33.33%';
            const InputId = checkBoxl.nextElementSibling.id;
            allGoals[InputId].completed = !allGoals[InputId].completed;
            completedGoalsCount = Object.values(allGoals).filter((goals) => goals.completed).length
            progressValue.style.width = `${completedGoalsCount/3 *100}%`;
            progressValue.firstElementChild.innertext = `${(completedGoalsCount / inputFields.length) * 100}%`;
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
            progress.firstElementChild.innerText = allQuotes[completedGoalsCount];
        }
        else{
           progress.classList.add("showError");
        }
    })
})


inputFields.forEach((input) =>{

    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name
    
        if (allGoals[input.id].completed) {
          input.parentElement.classList.add('completed')
        }
      }

    input.addEventListener("focus", ()=>{
        progress.classList.remove("showError");
    })

    input.addEventListener('input' , (e) =>{

         if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name
      return
    }
        if(allGoals[input.id]){
            allGoals[input.id].name = input.value
        }
        else {
            allGoals[input.id] = {
              name: input.value,
              completed: false,
            }
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})