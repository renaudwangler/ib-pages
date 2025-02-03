/* Gestion de l'ajout du bouton de copie des zones de code */
function addCopyButton() {
    document.querySelectorAll("code").forEach((codeBlock) => {
      if (navigator.clipboard) {
        copyButton = document.createElement("button");
        copyButton.innerText = '';
        copyButton.className = 'copyBtn';
        copyButton.title = 'Cliquez pour copier ce texte dans votre presse-papier.';
        copyButton.type = 'button';
        codeBlock.appendChild(copyButton);
        copyButton.addEventListener("click", async () => { await copyCode(codeBlock);}); }});}
async function copyCode(codeBlock) {
    await navigator.clipboard.writeText(codeBlock.innerText);
    codeBlock.getElementsByTagName('button')[0].className='copyBtnDone';
    codeBlock.getElementsByTagName('button')[0].title = 'Texte copié (recliquez pour copier de nouveau)';
    setTimeout(() => {
      codeBlock.getElementsByTagName('button')[0].className='copyBtn';
      codeBlock.getElementsByTagName('button')[0].title = 'Cliquez pour copier ce texte dans votre presse-papier.';}, 10000);}
  
/* Gestion du suivi des tâches accomplies dans les ateliers */
function checkBoxes(lineToCheck) {
    numLine = 0
    stagePath = window.location.pathname.split('/')
    stageName = stagePath.pop()
    if (stageName == '') { stageName = stagePath.pop()}
    lineToCheck=lineToCheck.split('-')[1]
    document.querySelectorAll('ol').forEach((olBlock) => {
      Array.prototype.slice.call(olBlock.getElementsByTagName('li')).forEach((ligne) => {
        if (numLine <= lineToCheck) { 
          ligne.className = 'li_checked'
          localStorage.setItem(stageName+'-li-'+numLine,'checked') } else { 
          ligne.className = 'li_unchecked'
          localStorage.removeItem(stageName+'-li-'+numLine)}
        numLine++})})}
function addLiCheckbox() {
    numLine = 0
    stagePath = window.location.pathname.split('/')
    stageName = stagePath.pop()
    if (stageName == '') { stageName = stagePath.pop()}
    document.querySelectorAll('ol').forEach((olBlock) => {
      Array.prototype.slice.call(olBlock.getElementsByTagName('li')).forEach((ligne) => {
      ligne.id = 'li-'+numLine
      lineContent = document.createElement('span')
      lineContent.innerHTML = ligne.innerHTML
      while (ligne.hasChildNodes()) { ligne.removeChild(ligne.firstChild); }
      ligne.appendChild(lineContent)
      if (localStorage.getItem(stageName+'-li-'+numLine) == 'checked') { ligne.className = 'li_checked' } else { ligne.className = 'li_unchecked' }
      ligne.addEventListener('click',function(e) { if (e.target.nodeName==='LI') { checkBoxes(this.id) }})
      numLine++})})}

/* Gestion des Div pour la liste des APTS*/
function switchDiv(divId,titre) {
    div=document.getElementById(divId);
    if (div.style.display=='none') {
        titre.className='plus';
        div.style.display='block'}
    else {
        div.style.display='none'
        titre.className='moins';}}
function indexLoad() {
    if (localStorage.getItem('ibAPTSlastcourseView') !== undefined) { document.getElementById(localStorage.getItem('ibAPTSlastcourseView')).className='lastCourse';}}
function stageLoad(pageName) { localStorage.setItem('ibAPTSlastcourseView',pageName); }      