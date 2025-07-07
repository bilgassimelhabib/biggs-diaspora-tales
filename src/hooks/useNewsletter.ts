
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useNewsletter = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Déjà abonné",
            description: "Cette adresse email est déjà abonnée à notre newsletter.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Abonnement réussi !",
          description: "Merci de vous être abonné à notre newsletter.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'abonnement.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading };
};
