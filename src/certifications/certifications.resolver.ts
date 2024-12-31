import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CertificationsService } from '@src/certifications/certifications.service';
import { CreateCertificationInput } from '@src/certifications/dto/create-certification.input';
import { UpdateCertificationInput } from '@src/certifications/dto/update-certification.input';

@Resolver('Certification')
export class CertificationsResolver {
  /**
   * Inject service dependency.
   */
  constructor(private readonly certificationsService: CertificationsService) {}

  /**
   * Create a new certification.
   */
  @Mutation('createCertification')
  create(
    @Args('createCertificationInput')
    createCertificationInput: CreateCertificationInput,
  ) {
    return this.certificationsService.create(createCertificationInput);
  }

  /**
   * Find all certifications.
   */
  @Query('certifications')
  findAll() {
    return this.certificationsService.findAll();
  }

  /**
   * Find a certification by ID.
   */
  @Query('certification')
  findOne(@Args('id') id: string) {
    return this.certificationsService.findOne(id);
  }

  /**
   * Update a certification by ID.
   */
  @Mutation('updateCertification')
  update(
    @Args('id') id: string,
    @Args('updateCertificationInput')
    updateCertificationInput: UpdateCertificationInput,
  ) {
    return this.certificationsService.update(id, updateCertificationInput);
  }

  /**
   * Remove a certification by ID.
   */
  @Mutation('removeCertification')
  remove(@Args('id') id: string) {
    return this.certificationsService.remove(id);
  }
}
