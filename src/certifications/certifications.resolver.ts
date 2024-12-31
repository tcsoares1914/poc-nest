import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CertificationsService } from '@src/certifications/certifications.service';
import { CreateCertificationInput } from '@src/certifications/dto/create-certification.input';
import { UpdateCertificationInput } from '@src/certifications/dto/update-certification.input';

@Resolver('Certification')
export class CertificationsResolver {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Mutation('createCertification')
  create(
    @Args('createCertificationInput')
    createCertificationInput: CreateCertificationInput,
  ) {
    return this.certificationsService.create(createCertificationInput);
  }

  @Query('certifications')
  findAll() {
    return this.certificationsService.findAll();
  }

  @Query('certification')
  findOne(@Args('id') id: string) {
    return this.certificationsService.findOne(id);
  }

  @Mutation('updateCertification')
  update(
    @Args('id') id: string,
    @Args('updateCertificationInput')
    updateCertificationInput: UpdateCertificationInput,
  ) {
    return this.certificationsService.update(id, updateCertificationInput);
  }

  @Mutation('removeCertification')
  remove(@Args('id') id: number) {
    return this.certificationsService.remove(id);
  }
}
