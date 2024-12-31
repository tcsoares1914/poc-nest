import { Certification } from '@src/certifications/schemas/certification.schema';
import { CreateCertificationInput } from '@src/certifications/dto/create-certification.input';

export class CertificationTestMocks {
  public static getValidCertification(): Certification {
    const certification = new Certification();
    certification.code = 'AZ-900';
    certification.name = 'Azure Fundamentals';
    certification.description = 'Azure Fundamentals Certification description.';
    certification.badgeUrl = 'https://domain.com/assets/badge.png';
    certification.certificationUrl = 'https://domain.com/certification/az-900';
    certification.verificationUrl = 'https://domain.com/verify/az-900';

    return certification;
  }

  public static getValidCertificationDto(): CreateCertificationInput {
    const certification = new CreateCertificationInput();
    certification.code = 'AZ-900';
    certification.name = 'Azure Fundamentals';
    certification.description = 'Azure Fundamentals Certification description.';
    certification.badgeUrl = 'https://domain.com/assets/badge.png';
    certification.certificationUrl = 'https://domain.com/certification/az-900';
    certification.verificationUrl = 'https://domain.com/verify/az-900';

    return certification;
  }

  public static getCertifications(): Certification[] {
    const certifications: Certification[] = [
      {
        code: 'AZ-900',
        name: 'Azure Fundamentals',
        description: 'Azure Fundamentals Certification description.',
        badgeUrl: 'https://domain.com/assets/badge.png',
        certificationUrl: 'https://domain.com/certification/az-900',
        verificationUrl: 'https://domain.com/verify/az-900',
      },
      {
        code: 'AZ-104',
        name: 'Azure Administrator',
        description: 'Azure Administrator Certification description.',
        badgeUrl: 'https://domain.com/assets/badge.png',
        certificationUrl: 'https://domain.com/certification/az-104',
        verificationUrl: 'https://domain.com/verify/az-104',
      },
      {
        code: 'AZ-305',
        name: 'Azure Solutions Architect',
        description: 'Azure Solutions Architect Certification description.',
        badgeUrl: 'https://domain.com/assets/badge.png',
        certificationUrl: 'https://domain.com/certification/az-305',
        verificationUrl: 'https://domain.com/verify/az-305',
      },
    ];

    return certifications;
  }

  public static getNewCertification(): Certification {
    const newCertification: Certification = new Certification({
      code: 'AZ-900',
      name: 'Azure Fundamentals',
      description: 'Azure Fundamentals Certification description.',
      badgeUrl: 'https://domain.com/assets/badge.png',
      certificationUrl: 'https://domain.com/certification/az-900',
      verificationUrl: 'https://domain.com/verify/az-900',
    });

    return newCertification;
  }

  public static getUpdatedCertification() {
    return new Certification({
      code: 'AZ-900',
    });
  }
}
