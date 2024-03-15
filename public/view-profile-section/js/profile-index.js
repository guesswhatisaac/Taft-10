
const users = [
    {
        username: '@kweenyasmin',
        email: 'asistido_yasmin@gmail.com',
        lastname: 'Asistido',
        firstname: 'Yasmin',
        bio: 'To be or not to be.',
        phoneNum: '09143227896',
        password: '2kuyukoT',
        profilePicture: "../../global-assets/header/icon.jpg",
        isOwner: false,
        numReviews: 0
    },
    {
        username: '@shanecloma',
        email: 'cloma_shane@gmail.com',
        lastname: 'Cloma',
        firstname: 'Shane',
        bio: 'No pain, no gain!',
        phoneNum: '09808065541',
        password: 'iLovemyWIF3Y',
        profilePicture: "../../global-assets/header/icon.jpg",
        isOwner: false,
        numReviews: 0
    },
    {
        username: '@romanisaac',
        email: 'roman_isaac@gmail.com',
        lastname: 'Roman',
        firstname: 'Isaac',
        bio: 'Love is like a rosary, full of mystery.',
        phoneNum: '09066684661',
        password: 'valoGodz123',
        profilePicture: "../../global-assets/header/isaac-pic.jpg",
        isOwner: false,
        numReviews: 0
    },
    {
        username: '@kathmeow',
        email: 'cruz_kathleen@gmail.com',
        lastname: 'Cruz',
        firstname: 'Kathleen',
        bio: 'Time is gold.',
        phoneNum: '09702432277',
        password: 'BULDAK22enjoyer',
        profilePicture: "../../global-assets/header/kathleen-pic.png",
        isOwner: false,
        numReviews: 0
    },
    {
        username: '@alexisae',
        email: 'arcega_alexis@gmail.com',
        lastname: 'Arcega',
        firstname: 'Alexis',
        bio: 'Teamwork makes the dream work.',
        phoneNum: '09317573077',
        password: 'yashFOREVERloversS143',
        profilePicture: "../../global-assets/header/alexis-pic.jpeg",
        isOwner: false,
        numReviews: 0
    },
    {
        username: '@bashruiz',
        email: 'asistido_yasmin@gmail.com',
        lastname: 'Ruiz',
        firstname: 'Yashel',
        bio: 'Shark is life!',
        phoneNum: '09339464368',
        password: 'BABYsharkdududu',
        profilePicture: "../../global-assets/header/yash.jpg",
        isOwner: true,
        numReviews: 0
    },
    {
        username: '@hannissaad',
        email: 'vinuya_hannah@gmail.com',
        lastname: 'Vinuya',
        firstname: 'Hannah',
        bio: 'Slip in to the diamond life.',
        phoneNum: '09145134782',
        password: 'iLoveMYSHANIA22',
        profilePicture: "../../global-assets/header/hannah-pic.jpg",
        isOwner: true,
        numReviews: 0
    },
    {
        username: '@jeylinnumbawan',
        email: 'sandoval_jalene@gmail.com',
        lastname: 'Sandoval',
        firstname: 'Jalene',
        bio: 'Stay delulu until it becomes truelulu.',
        phoneNum: '09798243924',
        password: 'JaLeeforevah',
        profilePicture: "../../global-assets/header/jal-pic.jpg",
        isOwner: true,
        numReviews: 0
    },
    {
        username: '@onyourmark',
        email: 'lee_mark@gmail.com',
        lastname: 'Lee',
        firstname: 'Mark',
        bio: 'Be yourself.',
        phoneNum: '09091632635',
        password: 'alexisLangSapatNaILY',
        profilePicture: "../../global-assets/header/mark-pic.jpg",
        isOwner: true,
        numReviews: 0
    },
    {
        username: '@mojicajosh',
        email: 'mojica_josh@gmail.com',
        lastname: 'Mojica',
        firstname: 'Josh',
        bio: 'Patience is a virtue.',
        phoneNum: '09573670854',
        password: '404KANGKONGChips',
        profilePicture: "../../global-assets/header/josh-pogi.jpg",
        isOwner: true,
        numReviews: 0
    }];

    //let currentUser = new User();

document.addEventListener("DOMContentLoaded", function() {

    console.log(document.querySelector("#save-button"));

    const saveButton = document.querySelector("#save-button");
    saveButton.addEventListener("click", function(e) {
        // Your button click event handler code here
        console.log("Save button clicked!");
        e.preventDefault(); 
        window.location.href = "view-user-yasmin.html";
    });
    
        
    console.log("test");
    
    
});