<!-- TO-DO:
  Create a component that allows people to sign up for the Rebel Tools waiting list. This component will be shown on the homepage. It consists of the following elements:
  - A card, within which everything is wrapped.
  - An h2 heading saying 'Get started'
  - A paragraph saying 'Be the first to get access to Rebel Tools. Sign up for the waiting list:'
  - An input field for their first name
  - An input field for their email
  - An input field for their phone number
  - An input field for their organisation
  - A button to submit (labelled 'Join the waiting list')

  Each of the inputs needs to be validated (you should only be able to click the button once all fields are filled in.)
  - first name: required
  - email: required & is a valid email address
  - phone number: required
  - organisation: optional

  When someone clicks the button, the data needs to be sent to Firestore, into the collection 'waitinglist'. After the data has been added succesfully, show a different card saying their signup was succesful.

  Upate the Firestore security rules to allow anyone to add a document. Only the super admin should be able to read and update the documents. When creating a new document, the data needs to be validated again (see above for requirements.)
  -->
<template>
  Hello world 👋
</template>
<script>
export default {

}
</script>
