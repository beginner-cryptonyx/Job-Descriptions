let header = document.getElementById('type')

function txtupdate(){
    setTimeout (() => {header.remove(); header.innerHTML = "‎ Career Path"; document.getElementById('wel').appendChild(header)}, 500)

    setTimeout (() => {header.remove(); header.innerHTML = "‎ Next Steps"; document.getElementById('wel').appendChild(header)}, 5000)

    setTimeout (() => {header.remove(); header.innerHTML = "‎ Your Options"; document.getElementById('wel').appendChild(header)}, 10000);
    setTimeout(txtupdate, 15250)
}

txtupdate()


let grade_drpdw = document.getElementById("grade")

let grade_cont = document.getElementById("grade-cont")
grade_drpdw.addEventListener('click', () => {
    
    if (grade_cont.classList.contains('open')) {
        grade_cont.classList.remove('open')
        grade_cont.classList.add('close')

        setTimeout(() => {
            grade_cont.style.display = 'none'
            grade_cont.style.overflowY = 'hidden'
            grade_cont.style.height = '0'
            grade_cont.classList.remove('close')
        }, 200)
    } else {
        grade_cont.style.display = 'block'
        grade_cont.classList.remove('close')
        grade_cont.classList.add('open')
        
        grade_cont.style.overflowY = 'auto'
        grade_cont.style.height = '20vh'
    }
})

function switch_content(target_id, source_id){
    
    let source_element = document.getElementById(source_id)
    let target_element = document.getElementById(target_id)
    
    target_element.innerHTML = source_element.innerHTML
}

for (i=0; i<Array.from(document.getElementsByClassName("dropopt")).length; i++){
    Array.from(document.getElementsByClassName("dropopt"))[i].addEventListener('click', function(event){
    if (grade_cont.classList.contains('open')) {
        grade_cont.classList.remove('open')
        grade_cont.classList.add('close')

        setTimeout(() => {
            grade_cont.style.display = 'none'
            grade_cont.style.overflowY = 'hidden'
            grade_cont.style.height = '0'
            grade_cont.classList.remove('close')
        }, 200)

        var buttonValue = event.target.innerHTML;
        document.getElementById("holder").value = buttonValue;

    }}
    )
}

const output_activator = document.getElementById("sub")
const output_cont = document.getElementById("output-cont")
output_activator.addEventListener('click', function(event){
    // event.preventDefault()
//     setTimeout( () => { 
//     output_activator.remove()
//     output.classList.remove("hidden")
//     output.style.display = 'flex'

// }, 2000)
    document.getElementById('holder2').value = 'yes'
    
})

document.addEventListener('DOMContentLoaded', function(){
    fetch('/remove_form').then(function(response) {
        return response.json();
    }).then(function(data){
        if (data.action == 'remove'){
            document.getElementById('quest').remove();
            output_activator.remove()
            output_cont.classList.remove("hidden")
            output_cont.style.display = 'flex'
            fetch('/output').then(function(response) {
                return response.json();
            }).then(function(data){
                 document.getElementById("output").innerHTML = data.content;
            });
        }
    })
})
