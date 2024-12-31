
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CertificationStatus {
    PENDING = "PENDING",
    PASSED = "PASSED"
}

export class CreateCertificationInput {
    code: string;
    name: string;
    description?: Nullable<string>;
    badgeUrl?: Nullable<string>;
    certificationUrl?: Nullable<string>;
    verificationUrl?: Nullable<string>;
}

export class UpdateCertificationInput {
    code?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    badgeUrl?: Nullable<string>;
    certificationUrl?: Nullable<string>;
    verificationUrl?: Nullable<string>;
}

export class Certification {
    id: string;
    code: string;
    name: string;
    description?: Nullable<string>;
    badgeUrl?: Nullable<string>;
    certificationUrl?: Nullable<string>;
    verificationUrl?: Nullable<string>;
}

export abstract class IQuery {
    abstract certifications(): Nullable<Certification>[] | Promise<Nullable<Certification>[]>;

    abstract certification(id: string): Nullable<Certification> | Promise<Nullable<Certification>>;
}

export abstract class IMutation {
    abstract createCertification(createCertificationInput: CreateCertificationInput): Certification | Promise<Certification>;

    abstract updateCertification(id: string, updateCertificationInput: UpdateCertificationInput): Certification | Promise<Certification>;

    abstract removeCertification(id: string): Nullable<Certification> | Promise<Nullable<Certification>>;
}

type Nullable<T> = T | null;
