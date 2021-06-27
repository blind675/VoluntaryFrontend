import {Accordion, Button, Card, Form, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {addProject, fetchProjects} from "../../services/API";
import {Project} from "../../models/types";

export default function Projects() {
    const [projectName, setProjectName] = useState<string | undefined>();
    const [projects, setProjects] = useState<Project[] | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    async function addProjectPressed() {
        if (projectName) {
            setIsLoading(true);
            await addProject(projectName);
            loadProjects();
        }
    }

    function loadProjects() {
        setIsLoading(true);
        fetchProjects().then((result) => {
            setProjects(result);
            setIsLoading(false);
        });
    }

    function renderProjects() {
        if (isLoading) {
            return (
                <div style={{
                    display: 'flex',
                    flex: 1,
                    height: 400,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Spinner animation="border" role="status" variant="primary"/>
                </div>
            );
        }

        console.log(projects);

        return (
            <Accordion>
                {projects?.map((project) => {
                        return (
                            <Card style={{display:'flex', flex:1, color: 'black', alignItems: 'start'}} key={project.id}>
                                <Accordion.Toggle as={Card.Header} eventKey={project.id} style={{display:'flex', flex:1}}>
                                    Project: {project.name}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={project.id}>
                                    <Card.Body>
                                        <ul> ---- Add new TASK ---- </ul>
                                        {project.tasks.map((task) =>
                                            <ul
                                                key={task.id}
                                                style={{
                                                    marginLeft: 30,
                                                    height: 30,
                                                    flex: 1,
                                                    color: 'white',
                                                    backgroundColor: '#5a5a5a',
                                                    borderBottomStyle: 'solid',
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: 'gold',
                                                    alignSelf: 'stretch',
                                                    textAlign: 'left'
                                                }}
                                            >Task: {task.name}</ul>
                                        )}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        );
                    }
                )}
            </Accordion>
        );
    }

    return (
        <div style={{padding: 20}}>
            <h1>Projects</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 30,
                marginBottom: 30,
                justifyContent: 'center',
                alignItems: 'center',
                height: 60
            }}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Project name" value={projectName}
                                  onChange={(e) => setProjectName(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" onClick={addProjectPressed}>
                    Add project
                </Button>
            </div>
            {renderProjects()}
        </div>
    );
}
