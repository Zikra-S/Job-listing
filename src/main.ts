import "./style.css";

interface Job {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

const jobsData: Job[] = [
  {
    id: 1,
    company: "Photosnap",
    logo: "./src/assets/images/photosnap.svg",
    new: true,
    featured: true,
    position: "Senior Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA only",
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 2,
    company: "Manage",
    logo: "./src/assets/images/manage.svg",
    new: true,
    featured: true,
    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    languages: ["Python"],
    tools: ["React"],
  },
  {
    id: 3,
    company: "Account",
    logo: "./src/assets/images/account.svg",
    new: true,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA only",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
  {
    id: 4,
    company: "MyHome",
    logo: "./src/assets/images/myhome.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "5d ago",
    contract: "Contract",
    location: "USA only",
    languages: ["CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 5,
    company: "Loop Studios",
    logo: "./src/assets/images/loop-studios.svg",
    new: false,
    featured: false,
    position: "Software Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Ruby"],
    tools: ["Sass"],
  },
  {
    id: 6,
    company: "FaceIt",
    logo: "./src/assets/images/faceit.svg",
    new: false,
    featured: false,
    position: "Junior Backend Developer",
    role: "Backend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "UK only",
    languages: ["Ruby"],
    tools: ["RoR"],
  },
  {
    id: 7,
    company: "Shortly",
    logo: "./src/assets/images/shortly.svg",
    new: false,
    featured: false,
    position: "Junior Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["HTML", "JavaScript"],
    tools: ["Sass"],
  },
  {
    id: 8,
    company: "Insure",
    logo: "./src/assets/images/insure.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA only",
    languages: ["JavaScript"],
    tools: ["Vue", "Sass"],
  },
  {
    id: 9,
    company: "Eyecam Co.",
    logo: "./src/assets/images/eyecam-co.svg",
    new: false,
    featured: false,
    position: "Full Stack Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "3w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Python"],
    tools: ["Django"],
  },
  {
    id: 10,
    company: "The Air Filter Company",
    logo: "./src/assets/images/the-air-filter-company.svg",
    new: false,
    featured: false,
    position: "Front-end Dev",
    role: "Frontend",
    level: "Junior",
    postedAt: "1mo ago",
    contract: "Part Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
];

const filterBar = document.getElementById("filter-bar") as HTMLElement;
const filterPills = document.getElementById("filter-pills") as HTMLElement;
const jobList = document.getElementById("job-list") as HTMLElement;

let activeFilters: string[] = [];

function getJobTags(job: Job): string[] {
  return [job.role, job.level, ...job.languages, ...job.tools];
}

function renderFilterBar() {
  if (activeFilters.length === 0) {
    filterBar.classList.add("hidden");
    jobList.className = "space-y-12 md:space-y-5 pt-10 md:pt-12";
    return;
  }

  filterBar.classList.remove("hidden");
  jobList.className = "space-y-12 md:space-y-5 pt-8 md:pt-0";

  filterPills.innerHTML = activeFilters
    .map(
      (filter) => `
      <div class="flex items-center overflow-hidden rounded bg-[hsl(180,31%,95%)]">
        <span class="text-[hsl(180,29%,50%)] font-bold text-xs md:text-sm px-2 py-1 leading-none">${filter}</span>
        <button 
          data-remove="${filter}" 
          type="button" 
          aria-label="Remove ${filter} filter"
          class="bg-[hsl(180,29%,50%)] hover:bg-[hsl(180,14%,20%)] text-white font-bold h-full px-2 py-1 flex items-center justify-center transition-colors cursor-pointer text-xs"
        >
          ✕
        </button>
      </div>
    `,
    )
    .join("");
}

function renderJobs() {
  const filteredJobs = jobsData.filter((job) => {
    const jobTags = getJobTags(job);
    return activeFilters.every((filter) => jobTags.includes(filter));
  });

  jobList.innerHTML = filteredJobs
    .map((job) => {
      const tags = getJobTags(job);
      const featuredBorder = job.featured ? "border-l-[5px] border-[hsl(180,29%,50%)]" : "";

      return `
      <article class="bg-white rounded-md shadow-[0_10px_15px_rgba(91,164,164,0.12)] p-6 pt-8 md:px-8 md:py-4 relative flex flex-col md:flex-row md:items-center justify-between gap-4 ${featuredBorder}">
        
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5">
          <img 
            src="${job.logo}" 
            alt="${job.company} logo" 
            class="w-12 h-12 md:w-[64px] md:h-[64px] absolute -top-6 left-5 md:static rounded-full flex-shrink-0" 
          />

          <div class="pt-2 md:pt-0 space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[hsl(180,29%,50%)] font-bold text-sm md:text-base mr-1">${job.company}</span>
              ${
                job.new
                  ? `<span class="bg-[hsl(180,29%,50%)] text-white font-bold text-[10px] px-2 py-1 rounded-full uppercase leading-none tracking-wide inline-flex items-center justify-center">NEW!</span>`
                  : ""
              }
              ${
                job.featured
                  ? `<span class="bg-[hsl(180,14%,20%)] text-white font-bold text-[10px] px-2 py-1 rounded-full uppercase leading-none tracking-wide inline-flex items-center justify-center">FEATURED</span>`
                  : ""
              }
            </div>

            <h2 class="font-bold text-base md:text-[18px] text-[hsl(180,14%,20%)] hover:text-[hsl(180,29%,50%)] cursor-pointer transition-colors leading-tight">
              ${job.position}
            </h2>

            <ul class="flex items-center gap-2.5 text-[hsl(180,8%,52%)] text-xs md:text-sm font-medium">
              <li>${job.postedAt}</li>
              <li class="text-[8px]">•</li>
              <li>${job.contract}</li>
              <li class="text-[8px]">•</li>
              <li>${job.location}</li>
            </ul>
          </div>
        </div>

        <hr class="border-t border-[hsl(180,8%,52%)]/20 my-1 md:hidden" />

        <div class="flex flex-wrap items-center gap-2.5">
          ${tags
            .map(
              (tag) => `
            <button 
              data-tag="${tag}" 
              type="button" 
              class="bg-[hsl(180,31%,95%)] text-[hsl(180,29%,50%)] hover:bg-[hsl(180,29%,50%)] hover:text-white font-bold text-xs md:text-sm px-2.5 py-1.5 rounded transition-colors cursor-pointer leading-none"
            >
              ${tag}
            </button>
          `,
            )
            .join("")}
        </div>

      </article>
    `;
    })
    .join("");
}

jobList.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const tag = target.getAttribute("data-tag");

  if (tag && !activeFilters.includes(tag)) {
    activeFilters.push(tag);
    renderFilterBar();
    renderJobs();
  }
});

filterPills.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const removeTag = target.getAttribute("data-remove");

  if (removeTag) {
    activeFilters = activeFilters.filter((item) => item !== removeTag);
    renderFilterBar();
    renderJobs();
  }
});

renderFilterBar();
renderJobs();
