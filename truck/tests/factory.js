import prisma from "../util/prisma";

class EntitiesFactory {

    async createTruck() {
        const truck = await prisma.truck.create({
            data: {
                plate: "plate",
                capacity: 100,
            }
        })
        return truck;
    }

    async createParcel() {
        const parcel = await prisma.parcel.create({
            data: {
                weight: 100,
                cargo: "Electronics",
            }
        })
        return parcel;
    }
}

export default EntitiesFactory;