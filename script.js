let contain = document.createElement("div");
contain.setAttribute("class","contain1");
contain.innerHTML = `
    <h2 class="head com">Game of Thrones</h2>
        <div class="explain">
            <p class="isbn com">ISBN No</p>
            <p class="page com">Total Pages</p>
            <p class="author com">Author Name</p>
            <p class="publish com">Publisher</p>
            <p class="release com">Released on </p>
            <p class="characters">characters</p>
             <ol class="live">
                <li id="char1">Char1</li>
                <li id="char2">Char2</li>
                <li id="char3">Char3</li>
                <li id="char4">Char4</li>
                <li id="char5">Char5</li>
             </ol>
        </div>`          
document.body.append(contain);  

async function createContainer () {
    inp = document.querySelector("#inp2").value;
    console.log(inp);
    let inputUrl = await fetch(`https://anapioficeandfire.com/api/books/${inp}`);
    let result = await inputUrl.json();
    console.log(result);

    let bookName = result.name;
    document.querySelector(".head").innerText = bookName;

    let isbn = result.isbn;
    document.querySelector(".isbn").innerText = `ISBN No: ${isbn}`;

    let totPages = result.numberOfPages;
    document.querySelector(".page").innerText = `Total Pages: ${totPages}`;

    let authName = result.authors[0];
    document.querySelector(".author").innerText = `Author Name: ${authName}`;

    let publish = result.publisher;
    document.querySelector(".publish").innerText = `Publisher:${publish}`;

    let releaseDt = result.released;
    document.querySelector(".release").innerText = `Released on ${releaseDt}`;

    let charUrl = result.povCharacters;
    let outCharac=[];
    for(let i=0;i<5;i++){
        let inp = charUrl[i];
        async function foo(){
            let inpUrl = await fetch(inp);
            let res = await inpUrl.json();
            outCharac = res.aliases[0];
            console.log("char",outCharac);
            document.querySelector(`#char${i+1}`).innerText = outCharac;
        }
        foo();
    }
}
createContainer();
