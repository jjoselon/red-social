import request from 'supertest';
import sinon, { SinonStub } from 'sinon';
import jwt from 'jsonwebtoken'
import app from '../src/index';
import axios from 'axios';

describe('Post microservice', () => {

    let jwtStub: SinonStub, axiosStub: SinonStub;
    const data = {
        message: "Response from Persistencia",
        data: [
            {id: 1, content: "post #1", likes: 12300, userId: 2},
            {id: 2, content: "post #2", likes: 12300, userId: 1},
        ]
    }

    beforeAll(() => {
        jwtStub = sinon.stub(jwt, "verify").callsFake(() => ({ username: "fakeUser", id: "fakeId"}));
    })

    afterAll(() => {
        jwtStub.restore();
        //axiosStub.restore();
    })

    afterEach(() => {
        axiosStub.restore();
    })

    it('Deberia devolver las publicaciones del usuario', async () => {

        axiosStub = sinon.stub(axios, 'get').resolves(data);

        const res = await request(app).get("/posts/my-posts").set("Authorization", "Bearer fake.fake.fake");

        expect(res.status).toBe(200);
        expect(res.body).toEqual(data);

    });

    it('Deberia devolver todas las publicaciones al dar like a una publicación', async () => {
        
        axiosStub = sinon.stub(axios, 'post').resolves(data);

        const postId = 1;
        const res = await request(app).post(`/posts/${postId}/like`).set("Authorization", "Bearer fake.fake.fake");

        expect(res.status).toBe(200);
        expect(res.body).toEqual(data);

    })

    it('Deberia fallar si el servicio de persistencia no se puede consultar', async () => {

        axiosStub = sinon.stub(axios, 'get').rejects(new Error("Error al conectar con el servicio de persistencia"));

        const res = await request(app).get("/posts/my-posts").set("Authorization", "Bearer fake.fake.fake");

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Failed to fetch from Persistencia" });

    });

    it('Deberia fallar si no se le envía el token de authorización en los encabezados', async () => {

        const res = await request(app).get("/posts/my-posts");

        expect(res.status).toBe(403);
        expect(res.body).toEqual({ message: "Token requerido" });

    });
})