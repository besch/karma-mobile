import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from 'react-query';
import { supabase } from '@/utils/supabase';
import { analyzeMedia } from '@/api';

export default function SubmissionScreen() {
  const [media, setMedia] = useState<string | null>(null);

  // Mutation using the shared API function
  const { mutate: analyzeMediaMutation } = useMutation((mediaUrl: string) => analyzeMedia(mediaUrl));

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setMedia(result.assets[0].uri);
      // Upload the media file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('media')
        .upload(`uploads/${Date.now()}`, result.assets[0].uri, {
          contentType: result.assets[0].type === 'video' ? 'video/mp4' : 'image/jpeg',
        });
      if (!error && data?.path) {
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(data.path);
        // Trigger the AI analysis endpoint using the imported API function via mutation
        analyzeMediaMutation(publicUrl);
      }
    }
  };

  return (
    <View style={styles.container}>
      {media && <Image source={{ uri: media }} style={styles.preview} />}
      <Button title="Pick Image/Video" onPress={pickMedia} />
      <Text style={styles.info}>Upload a media file and our AI will analyze it.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50 },
  preview: { width: 300, height: 300, marginBottom: 20 },
  info: { marginTop: 20, fontSize: 16 },
}); 