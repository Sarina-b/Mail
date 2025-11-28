document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').addEventListener('submit' , compose_email_btn)


  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email_btn(e){
  e.preventDefault();
  const recipients_email = document.querySelector('#compose-recipients').value;
  const subject_email = document.querySelector('#compose-subject').value;
  const body_email = document.querySelector('#compose-body').value;
  console.log("Submitting email:", {
  recipients: recipients_email,
  subject: subject_email,
  body: body_email
});
  fetch('/emails', {
  method: 'POST',
  body: JSON.stringify({
      recipients: recipients_email,
      subject: subject_email,
      body: body_email
  })
}).then(response => response.json())
  .then(result =>
      {
        console.log(result);
        load_mailbox('sent');
      })
      .catch(err => console.error("Fetch error:", err));
}

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('.each_email_show').style.display= 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('.each_email_show').style.display= 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  fetch(`/emails/${mailbox}`,  {
    method : 'GET',

    })
      .then(response => response.json())
      .then(result =>{

        console.log(result);

        result.forEach(email => {
          const each_email = document.createElement('div');
          each_email.className='each_email_div';
          if(email.read === false){
            each_email.style.backgroundColor = "#d6d6d6";
          }

          const left_side_of_email = document.createElement('div');
          left_side_of_email.className = 'left_side_of_email';
          each_email.append(left_side_of_email);

          const right_side_of_email = document.createElement('div');
          right_side_of_email.className = 'right_side_of_email';
          each_email.append(right_side_of_email);

           const email_subject = document.createElement('div');
          email_subject.className='email_subject';
          email_subject.textContent = `${email.subject}`;
          left_side_of_email.append(email_subject);



          const email_timestamp = document.createElement('div');
          email_timestamp.textContent=`${email.timestamp}`;
          email_timestamp.className='email_timestamp';
          right_side_of_email.append(email_timestamp);
          document.querySelector('#emails-view').append(each_email);

          if(mailbox === 'sent'){
            const email_recipients = document.createElement('div');
            email_recipients.className = 'email_recipients';
            email_recipients.textContent=`${email.recipients.join(' , ')}`;
            left_side_of_email.append(email_recipients);
          }else if(mailbox=== 'inbox'){
            const email_sender = document.createElement('div');
            email_sender.className = 'email_recipients';
            email_sender.textContent=`${email.sender}`;
            left_side_of_email.append(email_sender);
            const archive_btn = document.createElement('button');
            archive_btn.className = 'archive_btn' ;
            archive_btn.textContent = 'Archive';
            right_side_of_email.append(archive_btn);
            archive_btn.addEventListener('click' ,(event) =>{
              event.stopPropagation();
              make_archived(email.id);
            });
          }

          each_email.addEventListener('click' , ()=>each_email_show(email.id));
        });

      })
      .catch(err => console.error("Fetch error:", err));




}

function each_email_show(email_id){
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('.each_email_show').style.display= 'block';
  document.querySelector('.each_email_show').innerHTML = "";
  make_read_true(email_id)
  fetch(`/emails/${email_id}`, {
    method:'GET'
  }).then(response => response.json())
      .then(result =>{

    console.log(result);
    const email_from = document.createElement('div');
      email_from.textContent=`From : ${result.sender}`
      email_from.className='email_detail';

      const email_to = document.createElement('div');
      email_to.textContent=`To : ${result.recipients}`;
      email_to.className='email_detail';

      const email_subject = document.createElement('div');
      email_subject.textContent = `Subject : ${result.subject}`;
      email_subject.className = 'email_detail';

      const email_timestamp = document.createElement('div');
      email_timestamp.textContent = `Timestamp : ${result.timestamp}`;
      email_timestamp.className = 'email_detail';

      const email_body = document.createElement('div');
      email_body.textContent = `${result.body}`;
      email_body.className = 'email_detail';

      const hr=document.createElement('hr');
      hr.className='hr';


      document.querySelector('.each_email_show').append(email_from,email_to,
          email_subject,email_timestamp,hr,email_body);


  }).catch(err => console.error("Fetch error:", err));
}

function make_read_true(email_id){
  fetch(`/emails/${email_id}`, {
   method: 'PUT',
   body: JSON.stringify({
      read: true
   })
}).then(result => console.log(result))
}

function make_archived(email_id){
    fetch(`/emails/${email_id}`, {
   method: 'PUT',
   body: JSON.stringify({
      archived: true
   })
}).then( () => load_mailbox('inbox'))
        .catch(err => console.error(err));
}

function make_unarchived(email_id){
      fetch(`/emails/${email_id}`, {
   method: 'PUT',
   body: JSON.stringify({
      archived: false
   })
}).then(result => console.log(result))
  load_mailbox('inbox');

}

