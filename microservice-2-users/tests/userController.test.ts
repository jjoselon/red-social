import request from 'supertest';
import sinon, { SinonStub } from 'sinon';
import jwt from 'jsonwebtoken'
import app from '../src/index';
import axios from 'axios';

describe('Get profile', () => {

    let jwtStub: SinonStub, axiosStub: SinonStub;
    const data = {
        message: "Response from Persistencia",
        data: {
            id: 1,
            username: "Jhon",
            age: 27,
            city: "Bogotá",
        }
    }


    beforeAll(() => {
        jwtStub = sinon.stub(jwt, "verify").callsFake(() => ({ username: "fakeUser"}));
    })

    afterAll(() => {
        jwtStub.restore();
        //axiosStub.restore();
    })

    afterEach(() => {
        axiosStub.restore();
    })

    it('Deberia devolver los detalles del perfil', async () => {

        axiosStub = sinon.stub(axios, 'get').resolves(data);

        const res = await request(app).get("/user/profile").set("Authorization", "Bearer fake.fake.fake");

        expect(res.status).toBe(200);
        expect(res.body).toEqual(data);

    });

    it('Deberia fallar si el servicio de persistencia no se puede consultar', async () => {

        axiosStub = sinon.stub(axios, 'get').rejects(new Error("Error al conectar con el servicio de persistencia"));

        const res = await request(app).get("/user/profile").set("Authorization", "Bearer fake.fake.fake");

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Failed to fetch from Persistencia" });

    });

    it('Deberia fallar si no se le envía el token de authorización en los encabezados', async () => {

        const res = await request(app).get("/user/profile");

        expect(res.status).toBe(403);
        expect(res.body).toEqual({ message: "Token requerido" });

    });
})