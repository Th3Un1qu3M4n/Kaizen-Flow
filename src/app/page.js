'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';

export default function Home() {

  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectReward, setProjectReward] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  console.log("projectName", projectName)
  console.log("projectDescription", projectDescription)
  console.log("isConfirmed", isConfirmed)

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // locally adds project to the list
  const addProject = async () => {
    if (projectName && projectDescription && isConfirmed) {
      const newProject = {
        name: projectName,
        description: projectDescription,
        reward: projectReward,
        isCompleted: false
      }
      setIsConfirmed(false)
      setProjectName('')
      setProjectDescription('')
      setProjectReward('')
      setProjects([...projects, newProject])
    }else{
      alert('Please fill out all fields & confirm')
    }
  }

  // locally completes latest project
  const completeLatestProject = async () => {
    const allProjects = [...projects]
    allProjects[allProjects.length-1].isCompleted = true
    setProjects(allProjects)
  }


    
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <Image
            src="/images/logo.png"
            alt="Proof Logo"
            width={60}
            height={60}
          />
          <h1>Proof</h1>
        </div>
        <div className={styles.rightSection}>
          <Image
            src="/images/avatar.png"
            alt="User Avatar"
            width={60}
            height={60}
          />
        </div>
      </header>
      <div className={styles.content}>
        <h1 className={`${styles.title} py-4`}>
        The reason why we get stuck is because we are not in the state of completion & excellence. The succesful & honorable one is one who completes what he starts, as this builds trust & faith for creation to flow through him/her. 
        </h1>
        <h2 className={styles.subtitle}>
          Rules <br/>
          1- Only work on ONE PROJECT at a time.... & UNTIL completion. If you start you MUST finish.
        </h2>
        <p className={styles.description}>
          Why this rule is soo important?
        </p>

        <div className={styles.grid}>
          <h2 className={styles.project_name}>
            Name's Project
          </h2>
          {projects.map((project, index) => {
            console.log(index, projects, index==project.length-1)
            return(
                <div key={project.name} onClick={()=>{index==projects.length-1 ? ()=>{}: alert("Project Already Completed")}} data-bs-toggle="modal"  data-bs-target={index==projects.length-1 ?"#confirmModal":"noModal"} className={`${styles.projectBtn} ${project.isCompleted?styles.completed:""}`}>
                  #{index+1} - {project.name}
                </div>
            )})}
          {(projects.length==0) &&
           <div className={`${styles.startNewBtn}`} data-bs-toggle="modal"  data-bs-target="#exampleModal">
            Start New Project +
          </div>}
          { projects[projects.length-1]?.isCompleted &&
           <div className={`${styles.startNewBtn} ${styles.circle}`} data-bs-toggle="modal"  data-bs-target="#exampleModal">
              🧙‍ Start New Project #{projects.length+1} +
            </div>
          }

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog  modal-lg modal-dialog-centered">
                <div className={`${styles.modelContent} modal-content`}>
    
                    <div
                        className={`${styles.modelBodyClose}`}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      > X </div>
                    
                  <div className={`${styles.modelBody} modal-body`}>

                    <div className={`${styles.modelBodyContent}`}>
                      <input value={projectName} onChange={(e)=>setProjectName(e.target.value)} className={`${styles.modelBodyContentTitleInput}`}  type='text' placeholder='Name of Project 🧙‍♂️ (write start date)' />
                        
                      {/* </h1> */}
                      
                      <textarea value={projectDescription} onChange={(e)=>setProjectDescription(e.target.value)} className={`${styles.modelBodyContentDescriptionInput}`} rows={5} placeholder="Description of Project"></textarea>
                      
                      <div className={`${styles.confirm}`}>
                        Are you sure? You will have to complete & create this project fully...
                        <input checked={isConfirmed} onChange={(e)=>setIsConfirmed(!isConfirmed)} type="checkbox" className={`${styles.confirmCheckbox}`} />
                      </div>

                      <div className={`${styles.confirmed} ${isConfirmed?styles.visible:""} `}>
                        <div className={`${styles.confirmedText}`}>Your Reward for Completing this project: </div>
                        <input value={projectReward} onChange={(e)=>setProjectReward(e.target.value)}className={`${styles.confirmedInput}`} type='text' />
                        <div data-bs-dismiss="modal" aria-label="Close" onClick={()=>addProject()} className={`${styles.confirmedBtn}`}>I Commit to this project</div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          


            <div
              className="modal fade"
              id="confirmModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog  modal-lg modal-dialog-centered">
                <div className={`${styles.modelContent} modal-content`}>
    
                    <div
                        className={`${styles.modelBodyClose}`}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      > X </div>
                    
                  <div className={`${styles.modelBody} modal-body`}>

                    <div className={`${styles.modelBodyContent}`}>
                      <h1 className='mb-4'>Did You Complete the task?</h1>
                      
                     
                        <div data-bs-dismiss="modal" aria-label="Close" onClick={()=>completeLatestProject()} className={`${styles.completeTaskBtn}`}>Yes I Completed this Task!</div>

                        <div data-bs-dismiss="modal" aria-label="Close" className={`${styles.unCompleteTaskBtn}`}>No...not Yet</div>
                      
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>

        </div>

      </div>
      
    </main>
  )
}
