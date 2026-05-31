export const PrismaErrorCode = {
  /** Unique constraint failed. */
  UniqueConstraintViolation: 'P2002',
  /** Record was not found. */
  RecordNotFound: 'P2025',
} as const;
