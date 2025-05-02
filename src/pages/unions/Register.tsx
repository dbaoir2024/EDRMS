// src/pages/unions/Register.tsx
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { FileUpload } from '../../components/ui/file-upload';

const unionSchema = z.object({
  name: z.string().min(3, "Union name must be at least 3 characters"),
  registrationNumber: z.string().min(5, "Registration number is required"),
  industry: z.string().min(1, "Industry is required"),
  constitutionFile: z.instanceof(File).refine(
    file => file.size <= 5_000_000,
    "Max file size is 5MB"
  ),
});

export default function UnionRegistrationPage() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(unionSchema),
    defaultValues: {
      name: "",
      registrationNumber: "",
      industry: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof unionSchema>) => {
    console.log('Registering union:', values);
    // Here you would typically call your API to register the union
    navigate('/unions', {
      state: { success: `Union ${values.name} registered successfully` }
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Register New Union</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Union Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. PNG Teachers Association" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. RN-2024-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Education, Mining, Healthcare" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="constitutionFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Constitution File (PDF)</FormLabel>
                <FormControl>
                  <FileUpload
                    accept=".pdf"
                    maxSize={5_000_000}
                    onDrop={acceptedFiles => field.onChange(acceptedFiles[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Register Union
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}