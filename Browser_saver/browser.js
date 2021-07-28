
let myLink = [] // its an array
// use const inorder not to reassign
// things that never change
const inputEl  = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn= document.getElementById("delete-btn")
const tabBtn   = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")



// get the signal when save button clicked
// with the onclick in html
// function saveLink() {
//     console.log("Button Clicked from onclick");
// }

// get links from localStorage
let linksFromLocalStorage = JSON.parse( localStorage.getItem("myLink") )
console.log(linksFromLocalStorage)

if ( linksFromLocalStorage ) {
    myLink = linksFromLocalStorage
    renderList(myLink)
}

function renderList(anyArray) {
    let listItem = ""
    for (let i = 0; i < anyArray.length; i++) {
        // add a list of anyArray[i]
        // in a template string form
        listItem += `
            <li>
                <a target = '_blank' href = '${anyArray[i]}' >
                    ${anyArray[i]}
                </a>
            </il>
        `
        console.log(anyArray[i])
    }
    console.log(listItem)
    // use innerHTML to write in the HTML
    ulEl.innerHTML = listItem
}


/* Its a better way */
// get the signal when save button clicked
// without the onclick in html

inputBtn.addEventListener("click", function() {
    // put the value in to the array
    myLink.push(inputEl.value)

    // clear the input value
    inputEl.value = ""

    // save myLeads array to localStorage
    // to make sure not to clear the saved links
    localStorage.setItem("myLink", JSON.stringify(myLink))
    /*
    localStorage.setItem(key, value)
    localStorage.getItem(key)
    localstorage.clear()
    */

    // set the value to put in html
    renderList(myLink)
    console.log("SAVE Clicked from addEventListener")
})

deleteBtn.addEventListener("click", function() {
    // clear localStorage
    localStorage.clear()
    // clear array
    myLink = []
    renderList(myLink)
    console.log("DELETE Clicked from addEventListener")
})

tabBtn.addEventListener("click", function() {
    // Save the url instead  of logging it out
    
    chrome.tabs.query( {active: true, currentWindow: true}, function(tabs){
        myLink.push(tabs[0].url)
        localStorage.setItem("myLink", JSON.stringify(myLink))
        renderList(myLink)
    })
})