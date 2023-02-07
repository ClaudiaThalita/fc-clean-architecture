import {Sequelize} from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";

describe("Test find customer use case", () =>{

    let sequelize: Sequelize;

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () =>{
        await sequelize.close();
    });

    it("should find a customer", async ()=>{
        const customerReposity = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerReposity)

        const costumer = new Customer("123","John");
        const adress = new Address("Street",123, "city", "Zip");
        costumer.changeAddress(adress);
        await customerReposity.create(costumer);

        const input = {
            id:"123",
        }

        const output = usecase.execute(input);
    });
});