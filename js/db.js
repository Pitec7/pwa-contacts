db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition') {
            //probably multiple tabs at once
            console.log('persistence failed.');
        }else if(err.code == 'unimplemented'){
            //lack of browser support
            console.log('Persistence not supported.');
        }
    });

// real-time listener
db.collection('contacts').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
            renderContact(change.doc.date(), change.doc.id);
        }

        if(change.type === 'removed'){
            removeContact(change.doc.id);
        }
    });
})


// add new contact
const form = document.querySelector('form');

form.addEventListener('submit', evt => {

    evt.preventDefault();

    const contact = {
        name: form.name.value,
        contactnumber: form.numbers.value
    };

    db.collection('contacts').add(contact).catch(err => {console.log(err)});

    form.name.value = '';
    form.numbers.value = '';
})

// delete a contact
const contactContainer = document.querySelector('.contacts');

contactContainer.addEventListener('click', evt => {
    console.log(evt);
    if(evt.target.tagName == 'I'){
        const id = evt.target.getAttribute('data-id');
        db.collection('contacts').doc(id).delete();
    }
})