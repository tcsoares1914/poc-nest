import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CertificationsService } from '@src/certifications/certifications.service';
import { CertificationsResolver } from '@src/certifications/certifications.resolver';
import {
  Certification,
  CertificationSchema,
} from '@src/certifications/schemas/certification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Certification.name, schema: CertificationSchema },
    ]),
  ],
  providers: [CertificationsResolver, CertificationsService],
})
export class CertificationsModule {}
