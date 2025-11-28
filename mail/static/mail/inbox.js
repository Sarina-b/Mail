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

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

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
          document.querySelector('#emails-view').append(each_email);

          const left_side_of_email = document.createElement('div');
          left_side_of_email.className = 'left_side_of_email';
          document.querySelector('.each_email_div').append(left_side_of_email);


          const email_recipients = document.createElement('div');
          email_recipients.className = 'email_recipients';
          email_recipients.textContent=`${email.recipients}`;

          const email_subject = document.createElement('div');
          email_subject.className='email_subject';
          email_subject.textContent = `${email.subject}`;

          document.querySelector('.left_side_of_email').append(email_recipients,email_subject);

          const right_side_of_email = document.createElement('div');
          right_side_of_email.className = 'right_side_of_email';
          document.querySelector('.each_email_div').append(right_side_of_email);

          const email_timestamp = document.createElement('div');
          email_timestamp.textContent=`${email.timestamp}`;
          email_timestamp.className='email_timestamp';

          right_side_of_email.append(email_timestamp);

        });

      })
      .catch(err => console.error("Fetch error:", err));




}

