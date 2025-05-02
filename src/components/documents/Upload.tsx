// src/pages/documents/Upload.tsx
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DocumentUploadForm } from '../../components/documents/UploadForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

const documentSchema = z.object({
  folder: z.string().min(1, "Folder is required"),
  documentType: z.string().min(1, "Document type is required"),
  reference: z.string().min(3, "Reference is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  file: z.instanceof(File).refine(
    file => file.size <= 10_000_000,
    "Max file size is 10MB"
  ),
  fileType: z.string(),
});

export default function DocumentUploadPage() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      documentType: '',
      reference: '',
      description: '',
      fileType: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof documentSchema>) => {
    console.log('Uploading document:', values);
    navigate('/documents', {
      state: { success: `Document uploaded to ${values.folder}` }
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Upload Document</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DocumentUploadForm />
        {form.formState.errors.root && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            {form.formState.errors.root.message}
          </div>
        )}
        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      </form>
    </div>
  );
}