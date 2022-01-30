import dayjs from 'dayjs';

class TVGuideSerializer {
  fromProgramDetails(broadcast) {
    return {
      broadcastId: broadcast.broadcastId,
      title: broadcast.title,
      plot: broadcast.plot,
      plotOutline: broadcast.plotOutline,
      startTime: dayjs(broadcast.startTime),
      endTime: dayjs(broadcast.endTime),
      runtime: broadcast.runtime,
      genre: broadcast.genre,
      firstAired: dayjs(broadcast.firstAired),
      parentalRating: broadcast.parentalRating,
      thumbnail: broadcast.thumbnail,
      rating: broadcast.rating,
      originalTitle: broadcast.originalTitle,
      cast: broadcast.cast,
      director: broadcast.director,
      writer: broadcast.writer,
      year: broadcast.year,
      imdbNumber: broadcast.imdbNumber,
      isSeries: Number(broadcast.isSeries),
      isRecording: Number(broadcast.isRecording),
      hasRecording: Number(broadcast.hasRecording)
    };
  }

  fromChannelInfo(guideEntry) {
    const { id: channelId, number, name, highDefinition, icon, thumbnail } = guideEntry;
    return {
      channelId,
      number,
      name,
      highDefinition,
      icon,
      thumbnail
    };
  }

  fromChannelGuideInfo(channelGuideData) {
    const programs = channelGuideData.programs.map(this.fromProgramDetails.bind(this));
    const byStartDate = (pgm1, pgm2) =>
      dayjs(pgm1.startTime).isAfter(dayjs(pgm2.startTime)) ? 1 : -1;
    programs.sort(byStartDate);
    return {
      ...this.fromChannelInfo(channelGuideData),
      programs
    };
  }

  fromGuideData(guide) {
    return guide.map(this.fromChannelGuideInfo.bind(this));
  }
}

export default new TVGuideSerializer();
