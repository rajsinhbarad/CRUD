let records1 = JSON.parse(localStorage.getItem("localdata")) || []
let isEdit = -1;

// deletedata
const deleteData = (value) => {
    const deleteData = records1.filter((item, index) => { return index !== value });
    console.log(deleteData);
    records1 = deleteData;
    localStorage.setItem("localdata", JSON.stringify(records1))
    Table1();
}


// const Table1 = () => {
//     document.getElementById("table").innerHTML = records1.map((item, index) => { return `<tr>
//     <td>${item.name}</td>
//     <td>${item.email}</td>
//     <td>${item.password}</td>
//     <td><button onclick="deleteData(${index})">Delete</button></td>
//     <td><button onclick="editData(${index})">Edit</button></td>
//     <td><input  onclick="checkMainCheckbox()" type="checkbox" class="subCheckbox" /></td>
//     </tr>`}).join("")
    
// }

const demo = () => {
    const name = document.getElementById("name").value;
    console.log(name);
    const email = document.getElementById("email").value;
    console.log(email);
    const ps = document.getElementById("password").value;
    console.log(ps);
    const table = { name: name, email: email, password: ps, };
    console.log(table);
    console.log(records1);
    
    //edit
    if (isEdit !== -1) {
        const updatedArray = records1.map((item, index) => {
            if (index === isEdit)
                return table
            else return item
        })
        localStorage.setItem("localdata", JSON.stringify(updatedArray))
        records1 = updatedArray
        console.log(updatedArray);
    }
    else {
        records1.push(table);
        localStorage.setItem("localdata", JSON.stringify(records1))
        
    }
    Table1();
}

//checkbox
function selectcheckboxes() {
    let mainCheckbox = document.getElementById("mainCheckbox");
    let subCheckboxes = document.getElementsByClassName("subCheckbox");
    for (let i = 0; i < subCheckboxes.length; i++) {
        subCheckboxes[i].checked = mainCheckbox.checked; 
    }
}
function checkMainCheckbox() {
    let mainCheckbox = document.getElementById("mainCheckbox");
    let subCheckboxes = document.getElementsByClassName("subCheckbox");
    let allChecked = true;
    for (let i = 0; i < subCheckboxes.length; i++) {
        if (!subCheckboxes[i].checked) {
            allChecked = false;
            break;
        }
    }
    mainCheckbox.checked = allChecked;
}

//shortdata
const showSortOptions = () => {
   
};
const sortData = (sortOption) => {
    // Implement sorting logic based on the selected option
    if (sortOption === "name") {
        records1.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "date") {
        // Implement date sorting logic if needed
    } else if (sortOption === "type") {
        // Implement type sorting logic if needed
    }
    Table1();
};    


//search function
const searchData = () => {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    // Filter records based on the search input
    const filteredRecords = records1.filter(item =>
        item.name.toLowerCase().includes(searchInput) ||
        item.email.toLowerCase().includes(searchInput) ||
        item.password.toLowerCase().includes(searchInput)
    );
    // Display the filtered records in the table
    document.getElementById("table").innerHTML = filteredRecords.map((item, index) => {
        return `<tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.password}</td>
            <td><button onclick="deleteData(${index})">Delete</button></td>
            <td><button onclick="editData(${index})">Edit</button></td>
            <td><input onclick="checkMainCheckbox()" type="checkbox" class="subCheckbox" /></td>
        </tr>`;
    }).join("");
};


const deleteSelected = () => {
    let subCheckboxes = document.getElementsByClassName("subCheckbox");
    let selectedIndexes = [];

    for (let i = 0; i < subCheckboxes.length; i++) {
        if (subCheckboxes[i].checked) {
            selectedIndexes.push(i);
        }
    }

    const updatedArray = records1.filter((item, index) => !selectedIndexes.includes(index));

    localStorage.setItem("localdata", JSON.stringify(updatedArray));
    records1 = updatedArray;
    Table1();
};

// ...

const editData = (editer) => {
    isEdit = editer;
    Table1(); // Trigger the table update to show editable fields
}

const Table1 = () => {
    const tableHTML = records1.map((item, index) => {
        return `<tr>
            <td>${isEdit === index ? `<input type="text" id="editName" value="${item.name}" />` : item.name}</td>
            <td>${isEdit === index ? `<input type="email" id="editEmail" value="${item.email}" />` : item.email}</td>
            <td>${isEdit === index ? `<input type="password" id="editPassword" value="${item.password}" />` : item.password}</td>
            <td>${isEdit === index ? '' :  `<button onclick="deleteData(${index})">Delete</button>`}</td>
            <td>${isEdit === index ? `<button onclick="saveData(${index})">Save</button>` : `<button onclick="editData(${index})">Edit</button>`}</td>
            <td><input onclick="checkMainCheckbox()" type="checkbox" class="subCheckbox" /></td>
        </tr>`;
    }).join("");
    document.getElementById("table").innerHTML = tableHTML;
}

const saveData = (index) => {
    const newName = document.getElementById("editName").value;
    const newEmail = document.getElementById("editEmail").value;
    const newPassword = document.getElementById("editPassword").value;

    records1[index].name = newName;
    records1[index].email = newEmail;
    records1[index].password = newPassword;

    localStorage.setItem("localdata", JSON.stringify(records1));
    isEdit = -1;
    Table1(); // Trigger the table update to show saved data
};


// const saveData = (index) => {
//     const newName = document.getElementById(`editName_${index}`).value;
//     const newEmail = document.getElementById(`editEmail_${index}`).value;
//     const newPassword = document.getElementById(`editPassword_${index}`).value;
//     records1[index].name = newName;
//     records1[index].email = newEmail;
//     records1[index].password = newPassword;
//     Table1();
//   };

//   const editAndSaveButtons = (index) => {
//     return `
//       <td>
//         <button onclick="deleteData(${index})">Delete</button>
//       </td>
//       <td>
//         <button onclick="editData(${index})">Edit</button>
//       </td>
//       <td>
//         <input type="checkbox" class="subCheckbox" />
//       </td>
//       <td>
//         <input type="text" id="editName_${index}" value="${records1[index].name}"/>
//       </td>
//       <td>
//         <input type="email" id="editEmail_${index}" value="${records1[index].email}" />
//       </td>
//       <td>
//         <input type="password" id="editPassword_${index}" value="${records1[index].password}" />
//       </td>
//       <td>
//         <button onclick="saveData(${index})">Save</button>
//       </td>
//     `;
//   };

// function checkMainCheckbox() {
//     let mainCheckbox = document.getElementById("mainCheckbox");
//     let subCheckboxes = document.getElementsByClassName("subCheckbox");
//     let allChecked = true;

//     for (let i = 0; i < subCheckboxes.length; i++) {
//         if (!subCheckboxes[i].checked) {
//             allChecked = false;
//             break;
//         }
//     }

//     mainCheckbox.checked = allChecked;
// }