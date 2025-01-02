import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from '@src/users/users.resolver';
import { UsersService } from '@src/users/users.service';
import { CreateUserInput } from '@src/users/dto/create-user.input';
import { UpdateUserInput } from '@src/users/dto/update-user.input';
import { UserTestMocks } from '@src/commom/tests/mocks/user.mock';
import { NotFoundException } from '@nestjs/common';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUsers = UserTestMocks.getUsers();
  const mockNewUser = UserTestMocks.getNewUser();
  const mockUpdatedUser = UserTestMocks.getUpdatedUser();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    }).compile();

    mockService.create.mockReset();
    mockService.findAll.mockReset();
    mockService.findOne.mockReset();
    mockService.update.mockReset();
    mockService.remove.mockReset();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('When try to create a new user.', () => {
    it('should create a new user.', async () => {
      const input: CreateUserInput = {
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'batman@domain.com',
        password: '12345678',
      };

      mockService.create.mockResolvedValue(mockNewUser);
      const response = await resolver.create(input);

      expect(response).toEqual(mockNewUser);
      expect(mockService.create).toHaveBeenCalledTimes(1);
      expect(mockService.create).toHaveBeenCalledWith(input);
    });
  });

  describe('When try to list all users.', () => {
    it('should return a list all users.', async () => {
      mockService.findAll.mockResolvedValue(mockUsers);
      const response = await resolver.findAll();

      expect(typeof response).toEqual('object');
      expect(response).toEqual(mockUsers);
      expect(mockService.findAll).toHaveBeenCalledTimes(1);
    });
    it('should thow an Error when list all users.', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      expect(service.findAll).rejects.toThrowError();
    });
  });

  describe('When try to list one user.', () => {
    it('should list one user.', async () => {
      mockService.findOne.mockResolvedValue(mockUsers[0]);
      const id = '00000000-0000-0000-0000-000000000000';
      const response = await resolver.findOne(id);

      expect(response).toEqual(mockUsers[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
    it('should throw an Error when list one user.', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      const id = '00000000-0000-0000-0000-000000000000';
      expect(service.findOne(id)).rejects.toThrowError();
    });
  });

  describe('When try to update user data.', () => {
    it('should update a one user data.', async () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const input: UpdateUserInput = {
        email: 'batman@domain.com',
      };
      mockService.update.mockResolvedValue(mockUpdatedUser);
      const result = await resolver.update(id, input);

      expect(result).toMatchObject({
        email: input.email,
      });
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, input);
    });
    it('should throw an Error when update one user.', () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      expect(service.update).rejects.toThrowError();
    });
  });

  describe('When try to delete user.', () => {
    it('should delete one user.', async () => {
      mockService.remove.mockResolvedValue(undefined);
      const id = '00000000-0000-0000-0000-000000000000';
      const result = await resolver.remove(id);

      expect(result).toBeUndefined();
    });
    it('should throw an NotFoundException when delete one user.', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new NotFoundException());

      expect(service.remove).rejects.toThrowError();
    });
  });
});
