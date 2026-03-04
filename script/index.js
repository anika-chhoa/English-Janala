const loadLesson = () => {
  const lessonUrl = fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
loadLesson();

const displayLesson = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson- ${lesson.level_no}</button>
        `;

    lessonContainer.appendChild(div);
  });
};
