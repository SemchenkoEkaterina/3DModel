import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchKonus } from '../http/konusAPI';

const Konus = observer(() => {
    const [radius, setRadius] = useState();
    const [height, setHeight] = useState();
    const [n, setN] = useState();

    const addKonus = () => {

        fetchKonus(radius, height, n).then(data => {
            const COLOR_BG = "white";

            // set up the canvas and context
            let canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
            let ctx = canvas.getContext("2d");

            // dimensions
            let h = 2 * height;
            let w = document.documentElement.clientWidth;
            canvas.height = h;
            canvas.width = w;

            // colours and lines
            ctx.fillStyle = COLOR_BG;
            ctx.lineWidth = w / 1000;
            ctx.lineCap = "round";

            // parameters
            let cx = w / h;
            let cy = h * 5 / 4;
            let cz = 0;
            let vertices = data[0];
            let edges = data[1];
            let normal = data[2];
            // connecting sides
            requestAnimationFrame(loop);

            function loop() {
                 // background
                ctx.fillRect(0, 0, w, h);

                // rotate along the z axis
                let angle = 0;
                for (let v of vertices) {
                    let dx = v.x;
                    let dy = v.y;
                    let x = dx * Math.cos(angle) - dy * Math.sin(angle);
                    let y = dx * Math.sin(angle) + dy * Math.cos(angle);
                    v.x = x + cx;
                    v.y = y + cy;
                }

                // rotate along the x axis
                angle = 40;
                for (let v of vertices) {
                    let dy = v.y;
                    let dz = v.z;
                    let y = dy * Math.cos(angle) - dz * Math.sin(angle);
                    let z = dy * Math.sin(angle) + dz * Math.cos(angle);
                    v.y = y + cy;
                    v.z = z + cz;
                }

                // rotate along the y axis
                angle = -56;
                for (let v of vertices) {
                    let dx = v.x;
                    let dz = v.z;
                    let x = dz * Math.sin(angle) + dx * Math.cos(angle);
                    let z = dz * Math.cos(angle) - dx * Math.sin(angle);
                    v.x = x + cx;
                    v.z = z + cz;
                }

                // draw each edge
                for (let edge of edges) {
                    let gradient = ctx.createLinearGradient(normal[edge[0]][0].x, normal[edge[0]][0].y, normal[edge[0]][1].x, normal[edge[0]][1].y);
                    gradient.addColorStop(0, "grey");
                    gradient.addColorStop(1, "grey");
                    ctx.beginPath();
                    ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
                    ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
                    ctx.lineTo(vertices[edge[2]].x, vertices[edge[2]].y);
                    ctx.lineTo(vertices[edge[0]].x, vertices[edge[0]].y);
                    ctx.stroke();
                    ctx.fillStyle = gradient;
                    ctx.fill();

                }
            }
        }
        )
    }
    return (
        <Container className="mt-4">
            <Row className="mt-2">
                <Col md={12}>

                    <Form.Control
                        value={radius}
                        onChange={e => setRadius(e.target.value)}
                        className="mt-3"
                        placeholder="Введите радиус"
                    />
                    <Form.Control
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                        className="mt-3"
                        placeholder="Введите высоту"
                    />
                    <Form.Control
                        value={n}
                        onChange={e => setN(e.target.value)}
                        className="mt-3"
                        placeholder="Введите количество точек в основании"
                    />
                    <Button variant="outline-success" onClick={addKonus}>Добавить</Button>
                </Col>
            </Row>
        </Container>
    )
});

export default Konus;