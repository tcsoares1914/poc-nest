import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '@src/users/users.service';
import { User } from '@src/users/schemas/user.schema';
import { UserTestMocks } from '@src/commom/tests/mocks/user.mock';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const mockModel = {
    save: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: mockModel,
        },
        UsersService,
      ],
    }).compile();

    mockModel.save.mockReset();
    mockModel.find.mockReset();
    mockModel.findById.mockReset();
    mockModel.findByIdAndUpdate.mockReset();
    mockModel.findByIdAndDelete.mockReset();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When try to create a new user.', () => {
    it('should create a new user.', async () => {});
    it('should throw an InternalServerErrorException when create a new user.', async () => {});
  });

  describe('When try to list all users.', () => {
    it('should return a list all users.', async () => {
      const users = UserTestMocks.getUsers();
      mockModel.find.mockReturnValue(users);
      const result = await service.findAll();

      expect(model.find).toHaveBeenCalledTimes(1);

      expect(result).toHaveLength(users.length);
      expect(mockModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When try to list one user.', () => {
    it('should list one user.', async () => {
      const user = UserTestMocks.getValidUser();
      mockModel.findById.mockReturnValue(user);
      const id = '000000000000000000000000';
      const findAction = await service.findOne(id);

      expect(findAction).toMatchObject(user);
      expect(mockModel.findById).toHaveBeenCalledTimes(1);
    });
    it('should throw an BadRequestException when list one user.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000-000-000-000';

      await service.findOne(id).catch((ex) => {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(ex).toMatchObject({
          message: 'ID must be a ObjectId!',
        });
      });
    });
    it('should throw an NotFoundException when list one user.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000000000000000000000000';

      await service.findOne(id).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'User not found!',
        });
      });
    });
  });

  describe('When try to update user data.', () => {
    it('should update a one user data.', async () => {
      const users = UserTestMocks.getUsers();
      const id = '000000000000000000000000';
      const updatedUser = {
        email: 'batman@domain.com',
      };
      mockModel.findByIdAndUpdate.mockReturnValue({
        ...users[0],
        ...updatedUser,
      });

      const updateAction = await service.update(id, updatedUser);

      expect(updateAction).toMatchObject(updatedUser);
      expect(mockModel.findByIdAndUpdate).toBeCalledTimes(1);
    });
    it('should throw an BadRequestException when list one user.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000-000-000-000';
      const data = { email: 'test' };

      await service.update(id, data).catch((ex) => {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(ex).toMatchObject({
          message: 'ID must be a ObjectId!',
        });
      });
    });
    it('should throw an NotFoundException when update one user.', async () => {
      const id = '000000000000000000000000';
      const updatedUser = {
        email: 'batman@notfoundmail.com',
      };
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('User not found!'));

      await service.update(id, updatedUser).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'User not found!',
        });
      });
    });
  });

  describe('When try to delete user.', () => {
    it('should delete one user.', async () => {
      const user = UserTestMocks.getValidUserDto();
      mockModel.findById.mockReturnValue(user);
      mockModel.findByIdAndDelete.mockReturnValue(user);
      const id = '000000000000000000000000';
      const deleteAction = await service.remove(id);

      expect(deleteAction).toMatchObject(user);
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
    it('should throw an BadRequestException when list one user.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000-000-000-000';

      await service.remove(id).catch((ex) => {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(ex).toMatchObject({
          message: 'ID must be a ObjectId!',
        });
      });
    });
    it('should throw an NotFoundException when delete one user.', async () => {
      const user = UserTestMocks.getValidUserDto();
      mockModel.findById.mockReturnValue(user);
      mockModel.findByIdAndDelete.mockReturnValue(null);
      const id = '000000000000000000000000';

      await service.remove(id).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'User not found!',
        });
      });
    });
  });
});
