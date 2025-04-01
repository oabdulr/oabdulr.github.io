

function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
    isValid = false; 
}

function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function addCourseInput() {
    const container = document.getElementById('coursesContainer');
    const courseEntryDiv = document.createElement('div');
    courseEntryDiv.className = 'course-entry'; 

    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'courses[]'; 
    newInput.placeholder = 'Enter course name (e.g., IT 101)';
    newInput.required = true; 

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button'; 
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        this.parentElement.remove(); 
    };

    courseEntryDiv.appendChild(newInput);
    courseEntryDiv.appendChild(deleteButton);

    container.appendChild(courseEntryDiv);
    displayError('coursesError', ''); 
}

function validateForm() {
    let isValid = true;
    const errorSpans = document.querySelectorAll('.error');
    for (let i = 0; i < errorSpans.length; i++){
        errorSpans[i].textContent = '';
    }

    const name = document.getElementById('name').value.trim();
    if (!name) displayError('nameError', 'Name is required.');

    const mascot = document.getElementById('mascot').value.trim();
    if (!mascot) displayError('mascotError', 'Mascot is required.');

    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0]; 
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!imageFile) {
         if (imageInput.required) displayError('imageError', 'Image upload is required.');
    } else if (!allowedTypes.includes(imageFile.type)) {
        displayError('imageError', `Invalid file type. Only PNG and JPG are allowed (got ${imageFile.type}).`);
    }

    const caption = document.getElementById('caption').value.trim();
    if (!caption) displayError('captionError', 'Image caption is required.');

    const textAreas = [
        { id: 'personalBg', errorId: 'personalBgError', name: 'Personal Background' },
        { id: 'professionalBg', errorId: 'professionalBgError', name: 'Professional Background' },
        { id: 'academicBg', errorId: 'academicBgError', name: 'Academic Background' },
        { id: 'webDevBg', errorId: 'webDevBgError', name: 'Web Development Background' }
    ];
    
    for (let i = 0; i < textAreas.length; i++){
        if (!document.getElementById(textAreas[i].id).value.trim()) {
            displayError(textAreas[i].errorId, `${textAreas[i].name} is required.`);
        }        
    }
    
    const platform = document.getElementById('platform').value.trim();
    if (!platform) displayError('platformError', 'Primary Computer Platform is required.');

    const courseInputs = document.querySelectorAll('#coursesContainer input[type="text"]');
    let courseRequirementMet = true; 
    if (courseInputs.length > 0) {
        for (let i = 0; i < courseInputs.length; i++){
            if (!courseInputs[i].value.trim()) {
                displayError('coursesError', 'Please fill in all added course names.');
                courseRequirementMet = false; 
                return; 
            }
        }
    }

    const agree = document.getElementById('agree').checked;
    if (!agree) displayError('agreeError', 'You must agree to the terms.');

    return isValid && courseRequirementMet; 
}


function displayResults(data) {
    const formElement = document.getElementById('byoForm');
    const resultContainer = document.getElementById('resultContainer');
    const resetLinkContainer = document.getElementById('resetLinkContainer');

    const reader = new FileReader();

    reader.onload = function(e) {
        let coursesHTML = 'Not provided';
        if (data.courses.length > 0) {
            coursesHTML = '<ul>';

            for (let i = 0; i < data.courses.length; i++){
                coursesHTML += `<li>${escapeHTML(data.courses[i])}</li>`;
            }
            coursesHTML += '</ul>';
        }

        const resultHTML = `
            <h3>Introduction: ${escapeHTML(data.name)}</h3>
            
            <figure>
                <img src="${e.target.result}" alt="${escapeHTML(data.caption)}">
                <figcaption>${escapeHTML(data.caption)}</figcaption>
            </figure>

            <h4>Mascot</h4>
            <p>${escapeHTML(data.mascot)}</p>

            <h4>Personal Background</h4>
            <p>${escapeHTML(data.personalBg).replace(/\n/g, '<br>')}</p> 
            
            <h4>Professional Background</h4>
            <p>${escapeHTML(data.professionalBg).replace(/\n/g, '<br>')}</p>

            <h4>Academic Background</h4>
            <p>${escapeHTML(data.academicBg).replace(/\n/g, '<br>')}</p>

            <h4>Background in Web Development</h4>
            <p>${escapeHTML(data.webDevBg).replace(/\n/g, '<br>')}</p>

            <h4>Primary Computer Platform</h4>
            <p>${escapeHTML(data.platform)}</p>

            <h4>Courses Currently Taking</h4>
            ${coursesHTML} 
            
            ${data.funnyThing ? `<h4>Funny Thing</h4><p>${escapeHTML(data.funnyThing).replace(/\n/g, '<br>')}</p>` : ''}
            ${data.anythingElse ? `<h4>Anything Else</h4><p>${escapeHTML(data.anythingElse).replace(/\n/g, '<br>')}</p>` : ''}
        `;

        resultContainer.innerHTML = resultHTML;

        formElement.style.display = 'none';
        resultContainer.style.display = 'block';
        resetLinkContainer.style.display = 'block'; 
    };

    if (data.imageFile) {
        reader.readAsDataURL(data.imageFile);
    } else {
         console.error("Image file not found for display."); 
    }
}


function processForm(event) {
    event.preventDefault(); 

    if (!validateForm()) {
        console.log("Form validation failed.");
        return false; 
    }

    console.log("Form validation passed. Processing data...");

    const formData = {
        name: document.getElementById('name').value.trim(),
        mascot: document.getElementById('mascot').value.trim(),
        imageFile: document.getElementById('image').files[0], 
        caption: document.getElementById('caption').value.trim(),
        personalBg: document.getElementById('personalBg').value.trim(),
        professionalBg: document.getElementById('professionalBg').value.trim(),
        academicBg: document.getElementById('academicBg').value.trim(),
        webDevBg: document.getElementById('webDevBg').value.trim(),
        platform: document.getElementById('platform').value.trim(),
        courses: [],
        funnyThing: document.getElementById('funnyThing').value.trim(),
        anythingElse: document.getElementById('anythingElse').value.trim()
    };

    const courseInputs = document.querySelectorAll('#coursesContainer input[type="text"]');
    
    for (let i = 0; i < courseInputs.length; i++){
        formData.courses.push(courseInputs[i].value.trim());
    }

    displayResults(formData);

    return false; 
}



function customResetForm() {
    document.getElementById('coursesContainer').innerHTML = ''; 
    const errorSpans = document.querySelectorAll('.error');
    for (let i = 0; i < errorSpans.length; i++){
        errorSpans[i].textContent = '';
    }
    console.log("Custom reset actions performed.");
}


function resetToForm() {
    const formElement = document.getElementById('byoForm');
    const resultContainer = document.getElementById('resultContainer');
    const resetLinkContainer = document.getElementById('resetLinkContainer');

    resultContainer.style.display = 'none';
    resetLinkContainer.style.display = 'none';
    resultContainer.innerHTML = ''; 

    formElement.style.display = 'block';

    formElement.reset(); 
    customResetForm(); 
    
    console.log("Reset back to form view.");
}