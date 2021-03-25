import { createStore } from "redux"

const subject = () => {
    document.getElementById("subject").innerHTML = `
    <header>
        <h1>WEB</h1>
        Hello, WEB!
    </header>
    `
}

const TOC = () => {
    const { contents } = store.getState()
    let list = ``
    contents.forEach(content => {
        list = list + `<li><a id="${content.id}" href="${content.id}.html">${content.title}</a></li>`
    })
    document.getElementById("toc").innerHTML = `
        <ol>
        ${list}
        </ol>
        `
    contents.forEach(content => {
        document.getElementById(`${content.id}`).addEventListener("click", (e) => {
            e.preventDefault()
            store.dispatch({ type: "SELETE", id: content.id })
        })
    });
};


const control = () => {
    document.getElementById("control").innerHTML = `
    <ul>
        <li><a href="/create">Create</a></li>
        <li><input type="button" value="Delete"></li>
    </ul>
`
}

const article = async () => {
    const { content_id, contents } = store.getState();
    const content = await contents.filter(item => item.id === content_id);
    try {

        // console.log(content);
        // console.log(content[0]);
        console.log(content[0].id);
        document.getElementById("article").innerHTML = `
        <article>
        <h2>${content[0].title}</h2>
        ${content[0].desc}
         </article>
        `
    } catch (err) {
        console.log(err);
    }
}

const initialState = {
    content_id: 0,
    contents: [
        { id: 1, title: "HTML", desc: "HTML is ..." },
        { id: 2, title: "CSS", desc: "CSS is ..." }
    ]
}

const reducer = (state = initialState, action) => {
    // console.log(state, action);
    switch (action.type) {
        case "SELETE":
            return { ...state, ...{ content_id: action.id } }
        default:
            return state
    }
}

const store = createStore(reducer)


const init = () => {
    subject()
    TOC()
    control()
    article()
}

store.subscribe(article)
init()