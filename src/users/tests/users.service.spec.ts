import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '@src/users/users.service';
import { User } from '@src/users/schemas/user.schema';
import { UserTestMocks } from '@src/commom/tests/mocks/users.mock';

describe('UsersService', () => {
  let service: UsersService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When try to create a new user.', () => {
    it('should create a new user.', async () => {});
    it('should throw an exception when create a new user.', () => {});
  });

  describe('When try to list all users.', () => {
    it('should return a list all users.', async () => {
      const users = UserTestMocks.getUsers();
      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      const findAll = await service.findAll();

      expect(service.findAll).toBeCalledTimes(1);
      expect(findAll).toMatchObject(users);
      expect(findAll).toHaveLength(2);
    });
    it('should thow an exception when list all users.', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new InternalServerErrorException());

      await service.findAll().catch((ex) => {
        expect(ex).toBeInstanceOf(InternalServerErrorException);
      });
    });
  });

  describe('When try to list one user.', () => {
    it('should list one user.', async () => {
      const user = UserTestMocks.getValidUserDto();
      mockModel.findById.mockReturnValue(user);
      const id = '00000000-0000-0000-0000-000000000000';
      const findAction = await service.findOne(id);

      expect(findAction).toMatchObject(user);
      expect(mockModel.findById).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception when list one user.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '00000000-0000-0000-0000-000000000000';

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
      const user = UserTestMocks.getUsers();
      const id = '00000000-0000-0000-0000-000000000000';
      const updateUser = {
        email: 'peter@spider.com',
      };
      mockModel.findByIdAndUpdate.mockReturnValue({
        ...user[0],
        ...updateUser,
      });

      const updateAction = await service.update(id, updateUser);

      expect(updateAction).toMatchObject(updateUser);
      expect(mockModel.findByIdAndUpdate).toBeCalledTimes(1);
    });
    it('should throw an NotFoundException when update one user.', async () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const updateUser = {
        email: 'peter@spider.com',
      };
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('User not found!'));

      await service.update(id, updateUser).catch((ex) => {
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
      const id = '00000000-0000-0000-0000-000000000000';
      const deleteAction = await service.remove(id);

      expect(deleteAction).toMatchObject(user);
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception when delete one user.', async () => {
      const user = UserTestMocks.getValidUserDto();
      mockModel.findById.mockReturnValue(user);
      mockModel.findByIdAndDelete.mockReturnValue(null);
      const id = '00000000-0000-0000-0000-000000000000';

      await service.remove(id).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'User not found!',
        });
      });
    });
  });
});
