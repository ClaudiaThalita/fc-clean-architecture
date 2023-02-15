import {Sequelize} from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123","John");
const address = new Address("Street",123, "Zip","City");
customer.changeAddress(address);

const MockRepository =  () =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findALl: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe("Unit Test find customer use case", () =>{



    it("should find a customer", async ()=>{
        const customerReposity = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerReposity)


        const input = {
            id:"123",
        }

        const output = {
            id:"123",
            name:"John",
            address:{
                street: "street",
                city: "City",
                number: 123,
                zip: "Zip",
            }
        }
        
        const result = usecase.execute(input);

        expect(result).toEqual(output);
    });
});