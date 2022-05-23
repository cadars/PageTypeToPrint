class MyHandler extends Paged.Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }

    beforeParsed(content) {
        // console.log(content);
        // inline footnotes
        const footnotes_calls = content.querySelectorAll(".footnote-ref");
        footnotes_calls.forEach( (call) => {
            // query note content
            const note = content.querySelector(call.querySelector("a").getAttribute('href'));
            // delete backref
            const backref = note.querySelector('.footnote-backref');
            backref.parentElement.removeChild(backref);
            // reate inline note
            const inline_note = document.createElement('span');
            inline_note.className = "footnote";
            inline_note.innerHTML = note.innerHTML;
            call.after(inline_note);
            call.parentElement.removeChild(call);
            
        })
    }
}
Paged.registerHandlers(MyHandler);