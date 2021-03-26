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
            store.dispatch({ type: "SELETE", id: content.id, mode: "read" })
        })
    });
};


const control = () => {
    document.getElementById("control").innerHTML = `
    <ul>
        <li id="jsCreate"><a href="/create">Create</a></li>
        <li><input type="button" value="Delete" id="delBtn"></li>
    </ul>
    `
    document.getElementById("jsCreate").addEventListener("click", (e) => {
        e.preventDefault()
        store.dispatch({ type: "CREATE", mode: "create" })
    })
    document.getElementById("delBtn").addEventListener("click", (e) => {
        e.preventDefault()
        const deleteContent = () => {
            const { content_id, contents } = store.getState()
            console.log(content_id);
            return contents.filter(content => content.id !== content_id)
        }
        console.log(deleteContent())
        store.dispatch({ type: "DELETE", contents: deleteContent(), mode: "home" })
    })
}

const article = async () => {
    const { content_id, contents, mode } = store.getState();
    if (mode === "read") {
        try {
            const content = await contents.filter(item => item.id === content_id);
            document.getElementById("article").innerHTML = `
            <article>
                <h2>${content[0].title}</h2>
                ${content[0].desc}
            </article>
            `
        } catch (err) {
            console.log(err);
        }
    } else if (mode === "create") {
        document.getElementById("article").innerHTML = `
        <article>
            <form id="jsForm">
                <p><input type="text" name="title" placeholder="title"</p>
                <p><textarea name="desc" placeholder="desc"></textarea></p>
                <p><button type="submit">Submit</button></p>
            </form>
        </article>
        `
        document.getElementById("jsForm").addEventListener("submit", (e) => {
            e.preventDefault()
            const { title: { value: title } } = e.target
            const { desc: { value: desc } } = e.target
            store.dispatch({ type: "UPDATE", newContent: { id: Date.now(), title, desc }, id: Date.now(), mode: "read" })
        })
    } else if (mode === "home") {
        document.getElementById("article").innerHTML = `
        <article>
            <h2>Welcome Redux~!</h2>
            Hello, Everyone
        </article>
        `
    }
}

const initialState = {
    mode: "home",
    content_id: 0,
    contents: [
        { id: 1, title: "HTML", desc: "HTML is ..." },
        { id: 2, title: "CSS", desc: "CSS is ..." }
    ]
}

const reducer = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case "SELETE":
            return { ...state, content_id: action.id, mode: action.mode }
        case "UPDATE":
            return { contents: [...state.contents, action.newContent], content_id: action.id, mode: action.mode }
        case "DELETE":
            return { ...state, contents: action.contents, mode: action.mode }
        case "CREATE":
            return { ...state, mode: action.mode }
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
store.subscribe(TOC)
init()