"use server";

import { authenticatedApiRequest } from "@/lib/helpers/fetch/authenticatedApiRequest";
import { CorporateIdentityInput } from "@/lib/validators/kybAdminSchema";

export async function submitCorporateIdentity(data: CorporateIdentityInput) {
  return authenticatedApiRequest<CorporateIdentityInput, { status: string; message: string }>(
    "/api/v1/admin/kyb/identity",
    "POST",
    data,
  );
}

export async function uploadCorporateDocs(body: FormData) {
  return authenticatedApiRequest<FormData, { status: string; message: string }>(
    "/api/v1/admin/kyb/documents",
    "POST",
    body,
  );
}
