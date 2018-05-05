package com.grahamcrockford.oco.notification;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.auto.value.AutoValue;

/**
 * Event fired when the user should be alerted of something.
 */
@AutoValue
@JsonDeserialize
public abstract class NotificationEvent {

  @JsonCreator
  public static NotificationEvent create(String message) {
    return new AutoValue_NotificationEvent(message);
  }

  @JsonProperty
  public abstract String message();
}