// Code Starts from HeRe

console.log("Hey")







// --------------------------------------------------------Selecting the Elements

//Initial Element Selecting

let First_Image_Input = document.body.querySelector("#Img-1");
let Second_Image_Input = document.body.querySelector("#Img-2");
let First_Image_Input_FileName = document.body.querySelector(".Image-1-File-Name");
let Second_Image_Input_FileName = document.body.querySelector(".Image-2-File-Name");
let NEXT_Button = document.body.querySelector(".Next-Button");

//IMG Tag Element Selecting

let First_IMG_Tag = document.body.querySelector(".First-Image");
let Second_IMG_Tag = document.body.querySelector(".Second-Image");

//Image Processing Element's Selecting

let Radio_Button = document.body.querySelectorAll("input[name='Position']");              //Radio Input's
let TB_Thickness_Input = document.body.querySelector("#TB-Thickness-Input");              //Top-Bottom Input
let LR_Thickness_Input = document.body.querySelector("#LR-Thickness-Input");              //Left-Right Input
let Border_Color_Input = document.body.querySelector("#Border-Color-Input");              //Border Color Input
let Download_Image = document.body.querySelector(".Save-Image");                          //Download Image Button
let Edited_Image_Section = document.body.querySelector(".Edited-Image-Section");          //Edited Image Section
let TB_Thickness_Apply_Button = document.body.querySelector(".TB-Thickness-Apply-Button");//TB Thickness Button
let LR_Thickness_Apply_Button = document.body.querySelector(".LR-Thickness-Apply-Button");//LR Thickness Button
let Border_Color_Apply_Button = document.body.querySelector(".Border-Apply-Button");        //Border Color Apply Btn










// --------------------------------------------------------Initial Running Codes

// Dummy Image Setting values 

let img1 = '',
    img2 = '',
    position = 'Portrait',
    tbThickness = "",
    lrThickness = "",
    borderColor;

// Setting Display None to IMG Tag's

First_IMG_Tag.style.display = "none"
Second_IMG_Tag.style.display = "none"









// --------------------------------------------------------Addint Event Listener

// Image filename update

First_Image_Input.addEventListener("change", function () {
    let filepath = First_Image_Input.value;
    let filename = filepath.split("\\").pop();
    First_Image_Input_FileName.innerHTML = filename;

    loadImage(First_Image_Input, function Img(Img) {
        img1 = Img;
        console.log("First image source:", Img.src);
    })
});

Second_Image_Input.addEventListener("change", function () {
    let filepath = Second_Image_Input.value;
    let filename = filepath.split("\\").pop();
    Second_Image_Input_FileName.innerHTML = filename;

    loadImage(Second_Image_Input, function Img(Img) {
        img2 = Img;
        console.log("Second image source:", Img.src);
    })
})









// --------------------------------------------------------Lodaing Image Function

function loadImage(input, callback) {
    if (input.files && input.files[0]) {
        let Reader = new FileReader();

        Reader.onload = function (express) {
            let Img = new Image();
            Img.onload = function () {
                console.log("Image loaded successfully:", Img);
                callback(Img);
            };
            Img.src = express.target.result;
        };

        Reader.readAsDataURL(input.files[0]);
    }
}








// --------------------------------------------------------NEXT Button Event Listener

let flexDirection = window.getComputedStyle(Edited_Image_Section).flexDirection;

NEXT_Button.addEventListener("click", function () {
    if (img1 && img2) {

        tbThickness = parseInt(TB_Thickness_Input.value);
        lrThickness = parseInt(LR_Thickness_Input.value);
        First_IMG_Tag.src = img1.src
        Second_IMG_Tag.src = img2.src
        Second_IMG_Tag.style.display = "block"
        First_IMG_Tag.style.display = "block"

        let flexDirection = window.getComputedStyle(Edited_Image_Section).flexDirection;
        if (flexDirection === "column") {
            Edited_Image_Section.style.flexDirection = "column"
            console.log(Edited_Image_Section.style.height)
            console.log(Edited_Image_Section.style.width)

            Edited_Image_Section.style.height = img1.height + img2.height + tbThickness + "px"
            let maxHeight = window.innerHeight * 94;  // Convert 94vh to pixels
            let currentHeight = Edited_Image_Section.offsetHeight;

            if (currentHeight > maxHeight) {
                Edited_Image_Section.style.overflowY = "scroll";
            } else {
                Edited_Image_Section.style.overflowY = "hidden";
            }
        }

        else if (flexDirection === "row") {

            Edited_Image_Section.style.height = (img1.height + img2.height) / 1.5 + tbThickness + "px";
            First_IMG_Tag.style.maxWidth = "42%";
            Second_IMG_Tag.style.maxWidth = "42%";
            if (Edited_Image_Section.maxWidth < img1.width + img2.width) {
                Edited_Image_Section.style.overflowX = "scroll";
            } else {
                Edited_Image_Section.style.overflowX = "hidden";
            }
        }
    }

    else { alert("Please select both Images") }
})








// --------------------------------------------------------Position(Radio Button) Event Listener

Radio_Button.forEach(radio => {
    radio.addEventListener("change", function () {
        position = radio.id;
        tbThickness = parseInt(TB_Thickness_Input.value);

        if (position === "Landscape") {
            Edited_Image_Section.style.flexDirection = "row"
            Edited_Image_Section.style.height = (img1.height + img2.height) / 1.5 + tbThickness + "px";
            First_IMG_Tag.style.maxWidth = "42%";
            Second_IMG_Tag.style.maxWidth = "42%";
            if (Edited_Image_Section.maxWidth < img1.width + img2.width) {
                Edited_Image_Section.style.overflowX = "scroll";
            }
        }

        else if (position === "Portrait") {
            Edited_Image_Section.style.flexDirection = "column"
            let maxHeight = window.innerHeight * 94;  // Convert 94vh to pixels
            Edited_Image_Section.style.height = img1.height + img2.height + tbThickness + "px"
            let currentHeight = Edited_Image_Section.offsetHeight;
            if (currentHeight > maxHeight) {
                Edited_Image_Section.style.overflowY = "scroll";
            } else {
                Edited_Image_Section.style.overflowY = "hidden";
            }
        }
    })
});








// --------------------------------------------------------Thickness Apply Button Event Listener

TB_Thickness_Apply_Button.addEventListener("click", function () {
    tbThickness = parseInt(TB_Thickness_Input.value);

    First_IMG_Tag.style.borderTop = `${tbThickness}px solid ${Border_Color_Input.value}`;
    First_IMG_Tag.style.borderBottom = `${tbThickness}px solid ${Border_Color_Input.value}`;
    Second_IMG_Tag.style.borderTop = `${tbThickness}px solid ${Border_Color_Input.value}`;
    Second_IMG_Tag.style.borderBottom = `${tbThickness}px solid ${Border_Color_Input.value}`;

    let maxHeight = window.innerHeight * 0.94;  // Convert 94vh to pixels
    Edited_Image_Section.style.height = img1.height + img2.height + tbThickness + "px"

    let currentHeight = Edited_Image_Section.scrollHeight;


    if (currentHeight > maxHeight) {
        Edited_Image_Section.style.overflowY = "scroll";
    } else {
        Edited_Image_Section.style.overflowY = "hidden";
    }
})

LR_Thickness_Apply_Button.addEventListener("click", function () {
    lrThickness = parseInt(LR_Thickness_Input.value);

    First_IMG_Tag.style.borderLeft = `${lrThickness}px solid ${Border_Color_Input.value}`;
    First_IMG_Tag.style.borderRight = `${lrThickness}px solid ${Border_Color_Input.value}`;
    Second_IMG_Tag.style.borderLeft = `${lrThickness}px solid ${Border_Color_Input.value}`;
    Second_IMG_Tag.style.borderRight = `${lrThickness}px solid ${Border_Color_Input.value}`;

    let maxWidth = window.innerWidth * 0.38;  // Convert 94vh to pixels
    Edited_Image_Section.style.width = (img1.width + img2.width + lrThickness) + "px"

    let currentWidth = Edited_Image_Section.scrollWidth;


    if (currentWidth > maxWidth) {
        Edited_Image_Section.style.overflowX = "scroll";
    } else {
        Edited_Image_Section.style.overflowX = "hidden";
    }
})







// --------------------------------------------------------Border Color Apply Button Event Listener

Border_Color_Apply_Button.addEventListener("click", function () {
    borderColor = Border_Color_Input.value;
    First_IMG_Tag.style.borderColor = borderColor;
    Second_IMG_Tag.style.borderColor = borderColor;
})







// --------------------------------------------------------Download Imgae Function(Using Canvas)

Download_Image.addEventListener("click", function () {
    if (typeof html2canvas !== 'undefined') {
        html2canvas(Edited_Image_Section).then(function (canvas) {
            let Image_File = canvas.toDataURL("image/jpg");

            let Image_Link = document.createElement("a");
            Image_Link.href = Image_File;
            Image_Link.download = "Image.jpg";

            Image_Link.click();
        });
    } else {
        alert("html2canvas is not loaded")
    }
})




//---------------------------------------CODE ENDS HERE---------------------------------------