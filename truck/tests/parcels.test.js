import app from "..";
import prisma from "../util/prisma";
import request from "supertest";
import EntitiesFactoy from "./factory";

describe('Parcels', () => {

    const factory = new EntitiesFactoy();

    beforeEach(async () => {
        await prisma.parcel.deleteMany();
        await prisma.truck.deleteMany();
    })

    afterEach(async () => {
        await prisma.parcel.deleteMany();
        await prisma.truck.deleteMany();
    })

    it("create a parcel", async () => {
        const truck = await factory.createTruck();
        const data = {
            weight: 100,
            cargo: "Electronics",
            truckId: truck.id
        }
        const response = await
            request(app)
                .post('/parcels')
                .send(data)
                .expect(200)

        console.log(response.body);

        expect(response.body.weight).toBe(data.weight);
        expect(response.body.cargo).toBe(data.cargo);
        expect(response.body.truck_id).toBe(data.truckId);

    })

    it("get all parcels", async () => {
        await factory.createParcel();
        const parcel = await prisma.parcel.findMany();
        console.log(parcel);
        const response = await request(app)
            .get('/parcels')
            .expect(200)

        expect(response.body.length).toEqual(1);
    })

    it("get a parcel by id", async () => {
        const parcel = await factory.createParcel();
        const response = await
            request(app)
                .get(`/parcels/${parcel.id}`)
                .expect(200)
        expect(response.body).toEqual(parcel);
    })

    it("load a parcel", async () => {
        const truck = await factory.createTruck();
        const parcel = await factory.createParcel();
        const response = await
            request(app)
                .put(`/parcels/load`)
                .send({ parcelId: parcel.id, truckId: truck.id })
                .expect(200)
        expect(response.body.truck_id).toBe(truck.id);
    })

    it("unload a parcel", async () => {

        const truck = await factory.createTruck();
        const parcel = await factory.createParcel(truck.id);
        const response = await
            request(app)
                .put(`/parcels/unload`)
                .send({ parcelId: parcel.id })
                .expect(200)
        expect(response.body.truck_id).toBe(null);
    })

    it("parcel changes trucks ", async () => {
        const truck1 = await factory.createTruck();
        const truck2 = await factory.createTruck();
        const parcel = await factory.createParcel();
        await prisma.parcel.update({
            where: {
                id: parcel.id
            },
            data: {
                truck_id: truck1.id
            }
        })

        const response = await
            request(app)
                .put(`/parcels/load`)
                .send({ parcelId: parcel.id, truckId: truck2.id })
                .expect(200)

        expect(response.body.truck_id).toBe(truck2.id);
    })
})