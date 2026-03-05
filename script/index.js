const loadLesson = () => {
  const lessonUrl = fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
loadLesson();

const removeActive=()=>{
  const lessonBtn=document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach(btn=>{
    btn.classList.remove("active")
  })
}

const manageLoading=(status)=>{
  if(status===true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  }else{
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
}

const synonyms=(arr)=>{
  const synonym=arr.map(syn=>`<button class="btn bg-blue-200 font-normal">${syn}</button>`).join(" ");
  return synonym;
}

const modalWords=async (id)=>{
  
  const modalUrl=`https://openapi.programming-hero.com/api/word/${id}`;
  const res= await fetch(modalUrl);
  const json=await res.json();
  displayModal(json.data);
}

const displayModal=(modal)=>{
  console.log(modal);
  const myModal=document.getElementById("myModal");
  myModal.innerHTML="";
  
  
  
  const div=document.createElement("div");
  div.innerHTML=`
  <div class="modal-box w-full">
  <h3 class="text-4xl font-semibold font-bangla mb-8">${modal.word} (<i class="fa-solid fa-microphone-lines"></i>:${modal.pronunciation})</h3>
  <p class="text-2xl font-semibold">Meaning</p>
  <p class="font-bangla text-2xl mb-8">${modal.meaning}</p>
  <p class="text-2xl font-semibold">Example</p>
  <p class="text-2xl mb-8">${modal.sentence}</p>
    <p class="font-bangla text-2xl font-semibold mb-8">সমার্থক শব্দ গুলো</p>
    <div id="synonym-container">
    ${synonyms(modal.synonyms)}
    </div>
    <div class="modal-action justify-start">
    <form method="dialog">
    <!-- if there is a button in form, it will close the modal -->
    <button class="btn btn-active btn-primary">Complete Learning</button>
    </form>
    </div>
    </div>
    `
    myModal.appendChild(div);
    myModal.showModal();
   
}

const lessonWords=(id)=>{
  manageLoading(true);
    const wordsUrl=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(wordsUrl)
    .then(res=>res.json())
    .then(json=>{
      const lessonBtn=document.getElementById(`lesson-btn-${id}`);
      removeActive();
      lessonBtn.classList.add("active")
      displayWords(json.data);
    })
}

const displayWords=(words)=>{
    const wordsContainer=document.getElementById("word-container");
    wordsContainer.innerHTML="";

    if(words.length===0){
      wordsContainer.innerHTML=`
      <div class="text-center col-span-full py-8 font-bangla space-y-4">
      <img class="mx-auto" src="../assets/alert-error.png"/>
        <p class="text-[#79716bFF]">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <p class="font-medium text-3xl">নেক্সট Lesson এ যান</p>
      </div>
      `;
      manageLoading(false);
      return;
    }

    words.forEach(word=>{
        const card=document.createElement("div");
        card.innerHTML=`
        <div class="bg-white p-14 text-center rounded-xl h-full">
        <h2 class="text-3xl font-bold mb-6">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="text-xl font-[500] mb-6">Meaning /Pronounciation</p>
        <div class="font-bangla text-3xl font-semibold mb-10">
          ${word.meaning?word.meaning:"অর্থ পাওয়া যায়নি"}/${word.pronunciation?word.pronunciation:"উচ্চারণ পাওয়া যায়নি"}
        </div>
        <div class="flex justify-between items-center">
          <button onclick="modalWords(${word.id})" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
        `
    wordsContainer.appendChild(card);
    })
    manageLoading(false);
}

const displayLesson = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="lessonWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson- ${lesson.level_no}</button>
        `;

    lessonContainer.appendChild(div);
  });
};
