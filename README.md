# RadixUI-Dialog

In this project, I built a great accessible Dialog form with fade-in and fade-out animation effects by using Radix and TailwindCSS.

# This project features

- The use of TypeScript to create type-safe app development experience.
- The use of custom hooks to update the contacts data.
- Radix UI: the use of Radix Dialog components to create fully-accessible dialog forms where we can tab through all the elements in the dialog form without going out to any elements outside the modal. When dismissed, either by pressing the Esc key or by any other means, the focus is brought back to the button that opened the modal. Other ways to close the modal include: click outside on the overlay, click the cross icon, or click the close button. They are all powered by Radix with great accessibility.
- TailwindCSS to style the Radix components. With support from Radix, I can use TailwindCSS to style give animation effects for the modal and overlay on open and on dismissal. One point to note here is that on dismissal of the modal, Radix will actually wait for the animation effects, styled by TailwindCSS, to finish before it actually unmounts the modal. Great feature by Radix!
- On submission of the modal form, there is a spinning icon and all the fields are disabled to denote the pending UI. Then the form modal is closed programmatically. This is done by using the open and onOpenChange props of the Dialog.Root component.
