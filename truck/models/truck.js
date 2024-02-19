import prisma from "../util/prisma";

class Truck {

    consructor() { }

    async createTruck(plate, capacity) {
        const truck = await prisma.truck.create({
            data: {
                plate: plate,
                capacity: capacity
            }
        })
        return truck;
    }

    async getTrucks() {
        const trucks =
            await prisma.truck.findMany({
                include: {
                    Parcel: {
                        select: {
                            id: true,
                            weight: true,
                            cargo
                        }
                    }
                }
            });

        return trucks;
    }

    async getTruckById(id) {
        const truck = await prisma.truck.findUnique({
            where: {
                id: id,
            },
            include: {
                Parcel: {
                    select: {
                        id: true,
                        weight: true,
                        cargo
                    }
                }
            }
        });
        return truck;
    }
}

export default Truck;