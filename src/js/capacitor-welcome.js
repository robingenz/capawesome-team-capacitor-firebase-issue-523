import { Browser } from "@capacitor/browser";
import { SplashScreen } from "@capacitor/splash-screen";

import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { FirebaseFirestore } from '@capacitor-firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ5yTxOrUByDdwfxSZ9s-CkYeCm_rwcLw",
    authDomain: "test-a8fc5.firebaseapp.com",
    projectId: "test-a8fc5",
    storageBucket: "test-a8fc5.appspot.com",
    messagingSenderId: "192576538022",
    appId: "1:192576538022:web:00f640ad899a44618b7b67"
};

async function init(){

    const thisCodeFails = async () => {
        const reference = `users/2NkGwKiBHFV1K5kDg9fJOcig78u2/lessons/lesson_1`;
        const { snapshot: doc1 } = await FirebaseFirestore.getDocument({
            reference,
        });

        if(!doc1.data){
            await FirebaseFirestore.setDocument({
                reference,
                data: { a:1, b: 2 },
            });
        }
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const db = initializeFirestore(firebaseApp, {});

    try{
        await thisCodeFails();
    } catch (e) {
        console.log(e)
    }
}

// init();


window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
    <main>
      <h1>Capacitor App</h1>
      <p>
        This project is used to create a minimal, reproducible example. Just add
        the affected Capacitor platforms and plugins.
      </p>
      <label for="myInput">Website:</label>
      <input
        type="text"
        id="myInput"
        name="myInput"
        value="https://capacitorjs.com/"
      />
      <button id="open-browser">Open Browser</button>
    </main>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot
        .querySelector("#open-browser")
        .addEventListener("click", async function (event) {
          const input = self.shadowRoot.getElementById("myInput").value;
          if (!input) {
            return;
          }
          await Browser.open({ url: input });
        });
    }
  },
);
